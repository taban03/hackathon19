import { ZOWE_VERSIONS_SUCCESS, ZOWE_VERSIONS_ERROR } from '../constants/zowe-versions-contants';


const dropDownDefaultState = {
    versions: [],
};

export const zoweVersionsReducer = (state = dropDownDefaultState, action) => {
    console.log(action.type)
    switch (action.type) {
        case ZOWE_VERSIONS_SUCCESS:
            return {
                ...state,
                versions: action.versions
            }
        case ZOWE_VERSIONS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default zoweVersionsReducer;
