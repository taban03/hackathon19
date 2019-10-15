import { ZOWE_VERSION_SUCCESS, ZOWE_VERSION_ERROR } from '../constants/zowe-versions-contants';

const zoweDefaultState = {
  zoweVersion: '1.5.0',
};

export const zoweVersionReducer = (state = zoweDefaultState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ZOWE_VERSION_SUCCESS:
      return {
        ...state,
        zoweVersion: action.version,
      };
    case ZOWE_VERSION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default zoweVersionReducer;
