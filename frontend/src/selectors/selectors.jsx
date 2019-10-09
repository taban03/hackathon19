import _ from 'lodash';

// check the current action against any states which are requests
export const createLoadingSelector = actions => state => _(actions).some(action => _.get(state.loadingReducer, action));

// eslint-disable-next-line
export const getVisibleTiles = (tiles, searchCriteria) => {
    console.log(tiles)
  if (tiles === undefined || tiles === null || tiles.length <= 0) {
    return [];
  }
  return tiles
    .filter(tile => {
      if (searchCriteria === undefined || searchCriteria === null || searchCriteria.length === 0) {
        return true;
      }
      return (
        tile.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
        tile.repository.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    })
    .sort((tile1, tile2) => tile1.name.localeCompare(tile2.name));
};
