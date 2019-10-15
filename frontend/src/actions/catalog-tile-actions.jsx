import { toast } from 'react-toastify';
import {
  FETCH_TILES_FAILED,
  FETCH_TILES_RETRY,
  FETCH_TILES_REQUEST,
  FETCH_TILES_STOP,
  FETCH_TILES_SUCCESS,
} from '../constants/catalog-tile-constants';
import { ZOWE_VERSION_ERROR, ZOWE_VERSION_SUCCESS } from '../constants/zowe-versions-contants';

const fetchRetryToastId = 9998;

export function fetchTilesFailed(error) {
  // send a notification toast message (do not duplicate or auto close)
  toast.dismiss(fetchRetryToastId);
  return {
    type: FETCH_TILES_FAILED,
    payload: error,
  };
}

export function fetchTilesSuccess(tiles) {
  // dismiss the notification if it is displayed
  toast.dismiss(fetchRetryToastId);
  return {
    type: FETCH_TILES_SUCCESS,
    payload: tiles.components,
  };
}

export function fetchTilesStop() {
  // dismiss the notification if it is displayed
  toast.dismiss(fetchRetryToastId);
  return {
    type: FETCH_TILES_STOP,
  };
}

export function fetchTilesRetry(retryAttempt, maxRetries) {
  toast.warn(`Could not get a response when fetching tile info, retrying (attempt ${retryAttempt} of ${maxRetries})`, {
    autoClose: false,
    toastId: fetchRetryToastId,
  });
  return {
    type: FETCH_TILES_RETRY,
  };
}

export function fetchTilesStart(id) {
  // dismiss the notification if it is displayed
  toast.dismiss(fetchRetryToastId);
  return {
    type: FETCH_TILES_REQUEST,
    payload: id,
  };
}

export function fetchZoweVersionSuccess(version) {
  return {
    type: ZOWE_VERSION_SUCCESS,
    version,
  };
}

export function fetchZoweVersionError(error) {
  return {
    type: ZOWE_VERSION_ERROR,
    error,
  };
}

export function fetchZoweVersion(zoweVersion) {
  return dispatch => {
    const url = `https://localhost:80/api/v1/ui/catalogs/version/${zoweVersion}/info`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error) {
          console.log('ERRRORE');
          throw res.error;
        }
        dispatch(fetchZoweVersionSuccess(res));
        return res.versions;
      })
      .catch(error => {
        dispatch(fetchZoweVersionError(error));
      });
  };
}
