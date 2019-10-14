import { ZOWE_VERSIONS_SUCCESS, ZOWE_VERSIONS_ERROR } from '../constants/zowe-versions-contants';

export function fetchZoweVersionsSuccess(versions) {
  return {
    type: ZOWE_VERSIONS_SUCCESS,
    versions,
  };
}

export function fetchZoweVersionsError(error) {
  return {
    type: ZOWE_VERSIONS_ERROR,
    error,
  };
}

export function fetchVersions() {
  return dispatch => {
    fetch('https://localhost:80/api/v1/ui/catalogs/versions')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error) {
          console.log('ERRRORE');
          throw res.error;
        }
        dispatch(fetchZoweVersionsSuccess(res));
        return res.versions;
      })
      .catch(error => {
        dispatch(fetchZoweVersionsError(error));
      });
  };
}
