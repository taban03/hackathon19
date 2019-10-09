import { ZOWE_VERSIONS_SUCCESS, ZOWE_VERSIONS_ERROR } from '../constants/zowe-versions-contants';


const dropDownDefaultState = {
    versions: [],
};

export const zoweVersionsReducer = (state = dropDownDefaultState, action) => {
    console.log(action.type)
    switch (action.type) {
        case ZOWE_VERSIONS_SUCCESS:
            console.log("SUCCESSSSSOO")
            return {
                ...state,
                versions: action.versions
            }
        case ZOWE_VERSIONS_ERROR:
            console.log("ERROR")
            return {
                ...state,
                error: action.error
            }
        default:
            console.log("DEFAULT")
            return state;
    }
}

export default zoweVersionsReducer;
