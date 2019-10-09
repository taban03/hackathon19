import { connect } from 'react-redux';
import Header from './Header';
import {
    fetchZoweVersionsSuccess,
    fetchZoweVersionsError,
    fetchVersions
} from '../../actions/fetch-versions-actions';
import {getVisibleTiles} from '../../selectors/selectors';

const mapStateToProps = state => ({
    versions: state.zoweVersionsReducer.versions,
    error: state.zoweVersionsReducer.error,
});

const mapDispatchToProps = {
    fetchZoweVersionsSuccess,
    fetchZoweVersionsError,
    fetchVersions,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);



