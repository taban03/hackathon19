import * as log from 'loglevel';
import { of, throwError, timer} from 'rxjs';
import { ofType } from 'redux-observable';
import {
    catchError,
    debounceTime,
    exhaustMap,
    map,
    mergeMap,
    retryWhen,
    takeUntil,
    filter,
    withLatestFrom,
} from 'rxjs/operators';
import { FETCH_TILES_REQUEST, FETCH_TILES_STOP } from '../constants/catalog-tile-constants';
import { fetchTilesFailed, fetchTilesRetry, fetchTilesSuccess } from '../actions/catalog-tile-actions';
import { UPDATE_TILE_SUCCESS } from '../constants/update-tile-constants'

const updatePeriod = Number(process.env.REACT_APP_STATUS_UPDATE_PERIOD);
const debounce = Number(process.env.REACT_APP_STATUS_UPDATE_DEBOUNCE);
const scalingDuration = process.env.REACT_APP_STATUS_UPDATE_SCALING_DURATION;

// terminate the epic if you get any of the following Ajax error codes
const terminatingStatusCodes = [500, 401, 403];
// override the termination if any of these APIM message codes are in the response
const excludedMessageCodes = ['MFS0103'];

function checkOrigin() {
  // only allow the gateway url to authenticate the user
  let allowOrigin = process.env.REACT_APP_GATEWAY_URL;
  if (
    process.env.REACT_APP_GATEWAY_URL === null ||
    process.env.REACT_APP_GATEWAY_URL === undefined ||
    process.env.REACT_APP_GATEWAY_URL === ''
  ) {
    allowOrigin = window.location.origin;
  }
  if (allowOrigin === null || allowOrigin === undefined) {
    throw new Error('Allow Origin is not set for Login/Logout process');
  }
  return allowOrigin;
}

/**
 * Construct the URL to fetch container data from the service
 * @param action the payload will contain a container Id
 * @returns the URL to call
 */
function getUrl(action) {
    console.log(process.env.REACT_APP_GATEWAY_URL);
  let url =
      process.env.REACT_APP_GATEWAY_URL + process.env.REACT_APP_CATALOG_HOME + process.env.REACT_APP_CATALOG_VERSION;
  // let url = 'https://localhost:80/api/v1/catalogs/latest';
  console.log(url);
  if (action.payload !== undefined) {
    url += `/${action.payload}`;
  }
  return url;
}

function getUpdateVersionUrl(action, store) {
    const newVersion = store.value.updateTileReducer.newversion;
    const url =
        process.env.REACT_APP_GATEWAY_URL + process.env.REACT_APP_CATALOG_HOME + process.env.REACT_APP_CATALOG_UPDATE + '/' + newVersion;
    console.log(url);
    if (action.payload !== undefined) {
        url += `/${action.newversion}`;
    }
    return url;
}


/**
 * Check the error to see if we should terminate or retry the fetch
 * @param error the error thrown
 * @returns {boolean} true if terminate
 */
function shouldTerminate(error) {
  let terminate = terminatingStatusCodes.find(e => e === error.status);
  if (terminate) {
    if (error.response.messages !== undefined) {
      const apiError = error.response.messages[0];
      if (apiError !== null && apiError !== undefined && apiError.messageNumber !== undefined) {
        // if this APIM message number is in the response, then override the terminate flag
        if (excludedMessageCodes.find(e => e === apiError.messageNumber)) {
          terminate = false;
        }
      }
    }
  }
  return terminate;
}

export const retryMechanism = scheduler => ({
  maxRetries = Number(process.env.REACT_APP_STATUS_UPDATE_MAX_RETRIES),
} = {}) => attempts =>
  attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (shouldTerminate(error)) {
        return throwError(error);
      }
      // used for display Toast retry notification
      fetchTilesRetry(retryAttempt, maxRetries);
      if (retryAttempt > maxRetries) {
        const message = `Could not retrieve tile info after ${maxRetries} attempts. Stopping fetch process.`;
        log.error(message);
        return throwError(new Error(message));
      }
      const msg = `Attempt ${retryAttempt}: retrying in ${scalingDuration * retryAttempt}s`;
      log.warn(msg);
      return timer(scalingDuration * retryAttempt, scheduler);
    })
  );

export const fetchTilesPollingEpic = (action$, store, { ajax, scheduler }) =>
  action$.pipe(
    ofType(FETCH_TILES_REQUEST),
    debounceTime(debounce, scheduler),
    mergeMap(action =>
      timer(0, updatePeriod, scheduler).pipe(
        exhaustMap(() =>
          ajax({
            url: getUrl(action),
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': checkOrigin(),
            },
          }).pipe(
            map(ajaxResponse => {
              const { response } = ajaxResponse;
              if (response === null || response.length === 0) {
                // noinspection JSValidateTypes
                return fetchTilesFailed(
                  action.payload.length > 0
                    ? new Error(`Could not retrieve details for Tile with ID: ${action.payload}`)
                    : new Error(`Could not retrieve any Tiles`)
                );
              }
              return fetchTilesSuccess(response);
            }),
            retryWhen(retryMechanism(scheduler)())
          )
        ),
        takeUntil(action$.ofType(FETCH_TILES_STOP)),
        catchError(error => {

          return of(fetchTilesFailed(error));
        })
      )
    )
  );


export const fetchUpdatedTilesPollingEpic = (action$, state$, { ajax, scheduler }) =>
    action$.pipe(
        ofType(UPDATE_TILE_SUCCESS),
        debounceTime(debounce, scheduler),
        withLatestFrom(state$),
        filter(([, state]) => state.newversion !== ''),
        mergeMap(action =>
            timer(0, updatePeriod, scheduler).pipe(
                exhaustMap(() =>
                    ajax({
                        url: getUpdateVersionUrl(action, state$),
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': checkOrigin(),
                        },
                    }).pipe(
                        map(ajaxResponse => {
                            const { response } = ajaxResponse;
                            if (response === null || response.length === 0) {
                                // noinspection JSValidateTypes
                                return fetchTilesFailed(
                                    action.payload.length > 0
                                        ? new Error(`Could not retrieve details for Tile with ID: ${action.payload}`)
                                        : new Error(`Could not retrieve any Tiles`)
                                );
                            }
                            return fetchTilesSuccess(response);
                        }),
                        retryWhen(retryMechanism(scheduler)())
                    )
                ),
                takeUntil(action$.ofType(FETCH_TILES_STOP)),
                catchError(error => {

                    return of(fetchTilesFailed(error));
                })
            )
        )
    );
