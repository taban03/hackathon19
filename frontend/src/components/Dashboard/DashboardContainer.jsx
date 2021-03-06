import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import {
  fetchTilesFailed,
  fetchTilesStart,
  fetchTilesSuccess,
  fetchTilesStop,
  fetchZoweVersion,
} from '../../actions/catalog-tile-actions';
import { clearService } from '../../actions/selected-service-actions';
import { filterText, clear } from '../../actions/filter-actions';
import { createLoadingSelector, getVisibleTiles } from '../../selectors/selectors';

const loadingSelector = createLoadingSelector(['FETCH_TILES']);

const mapStateToProps = state => ({
  searchCriteria: state.filtersReducer.text,
  tiles: getVisibleTiles(state.tilesReducer.tiles, state.filtersReducer.text),
  fetchTilesError: state.tilesReducer.error,
  isLoading: loadingSelector(state),
  zoweVersion: state.zoweVersionReducer.zoweVersion,
  newversion: state.updateTileReducer.newversion,
});

const mapDispatchToProps = {
  clearService,
  fetchTilesStart,
  fetchTilesSuccess,
  fetchTilesFailed,
  fetchTilesStop,
  filterText,
  clear,
  fetchZoweVersion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
