import { connect } from 'react-redux';
import Header from './Header';
import { fetchZoweVersionsSuccess, fetchZoweVersionsError, fetchVersions } from '../../actions/fetch-versions-actions';

import { updateVersionSuccess, updateVersionError } from '../../actions/update-version-actions';

const mapStateToProps = state => ({
  versions: state.zoweVersionsReducer.versions,
  error: state.zoweVersionsReducer.error,
  newversion: state.updateTileReducer.newversion,
});

const mapDispatchToProps = {
  fetchZoweVersionsSuccess,
  fetchZoweVersionsError,
  fetchVersions,
  updateVersionSuccess,
  updateVersionError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
