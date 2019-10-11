import { UPDATE_TILE_SUCCESS, UPDATE_TILE_ERROR } from '../constants/update-tile-constants';

export function updateVersionSuccess(versions) {
    return {
        type: UPDATE_TILE_SUCCESS,
        newversion: versions
    };
}

export function updateVersionError(error) {
    return {
        type: UPDATE_TILE_ERROR,
        error: error
    }
}

