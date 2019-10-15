import { Text } from 'mineral-ui';
import React, { Component } from 'react';
import SearchCriteria from '../Search/SearchCriteria';
import Shield from '../ErrorBoundary/Shield/Shield';
import './Dashboard.css';
import Tile from '../Tile/Tile';
import Spinner from '../Spinner/Spinner';
import formatError from '../Error/ErrorFormatter';
import TextArea from 'mineral-ui/TextArea';

export default class Dashboard extends Component {
  componentDidMount() {
    const { fetchTilesStart, clearService, fetchZoweVersion } = this.props;
    clearService();
    fetchTilesStart();
    fetchZoweVersion(this.props.newversion);
  }

  componenWillUnmount() {
    const { fetchTilesStop, clear } = this.props;
    clear();
    fetchTilesStop();
  }

  handleSearch = value => {
    const { filterText } = this.props;
    filterText(value);
  };

  render() {
    const { tiles, history, searchCriteria, isLoading, fetchTilesError, fetchTilesStop, fetchZoweVersion } = this.props;
    const hasSearchCriteria = searchCriteria !== undefined && searchCriteria !== null && searchCriteria.length > 0;
    const hasTiles = !fetchTilesError && tiles && tiles.length > 0;
    let error = null;
    if (fetchTilesError !== undefined && fetchTilesError !== null) {
      fetchTilesStop();
      error = formatError(fetchTilesError);
    }
    return (
      <div>
        <Spinner isLoading={isLoading} />
        {fetchTilesError && (
          <div className="no-tiles-container">
            <br />
            <br />
            <Text element="h3">Tile details could not be retrieved, the following error was returned:</Text>
            {error}
          </div>
        )}
        {!fetchTilesError && (
          <div className="apis">
            <div className="grid-container">
              <div className="filtering-container">
                <Shield title="Search Bar is broken !">
                  <SearchCriteria placeholder="Search for Zowe components" doSearch={this.handleSearch} />
                </Shield>
                <h2 className="api-heading">Components List for Zowe {this.props.newversion}</h2>
                <TextArea defaultValue={this.props.zoweVersion.description} readOnly />
              </div>
              {hasTiles && tiles.map(tile => <Tile key={tile.id} tile={tile} history={history} />)}
              {!hasTiles &&
                hasSearchCriteria && (
                  <Text id="search_no_results" element="h4" color="#1d5bbf">
                    No tiles found matching search criteria
                  </Text>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
