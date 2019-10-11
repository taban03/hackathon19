import { combineReducers } from 'redux';
import tilesReducer from './fetch-tile-reducer';
import filtersReducer from './filter-reducer';
import loadingReducer from './loading-reducer';
import errorReducer from './error-reducer';
import authenticationReducer from './authentication.reducer';
import selectedServiceReducer from './selected-service-reducer';
import zoweVersionsReducer from './zowe-versions-reducer';
import updateTileReducer from './update-tiles-reducer';

const reducers = {
    filtersReducer,
    tilesReducer,
    loadingReducer,
    errorReducer,
    authenticationReducer,
    selectedServiceReducer,
    zoweVersionsReducer,
    updateTileReducer,
};

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers(reducers);
