import { UPDATE_TILE_SUCCESS, UPDATE_TILE_ERROR } from '../constants/update-tile-constants';

const updateDefaultState = {
    newversion: '',
};

export const updateTileReducer = (state = updateDefaultState, action) => {
    console.log(action.type)
    switch (action.type) {
        case UPDATE_TILE_SUCCESS:
            return {
                ...state,
                newversion: action.newversion
            }
        case UPDATE_TILE_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default updateTileReducer;
