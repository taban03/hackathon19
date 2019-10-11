import { CardStatus } from 'mineral-ui';
import Link from 'mineral-ui/Link';
import Card, { CardBlock, CardTitle } from 'mineral-ui/Card';
import React, { Component } from 'react';

import './Tile.css';

export default class Tile extends Component {
  getStatusFromServiceTotals = tile => {
    const { status } = tile;
    let tileStatus = status;
    if (tileStatus === 'UP' && tile.totalServices !== tile.activeServices) {
      tileStatus = 'WARNING';
    }
    return tileStatus;
  };

  getStatusTextFromServiceTotals = tile => `${tile.activeServices} of ${tile.totalServices} services are running`;

  getTileStatus = tile => {
    if (tile === null || tile === undefined) {
      return 'Status unknown';
    }
    const status = this.getStatusFromServiceTotals(tile);
    switch (status) {
      case 'UP':
        return 'success';
      case 'DOWN':
        return 'danger';
      case 'WARNING':
        return 'warning';
      default:
        return 'Status unknown';
    }
  };

  getTileStatusText = tile => {
    if (tile === null || tile === undefined) {
      return 'Status unknown';
    }
    const status = this.getStatusFromServiceTotals(tile);
    switch (status) {
      case 'UP':
        return 'All services are running';
      case 'DOWN':
        return 'No services are running';
      case 'WARNING':
        return this.getStatusTextFromServiceTotals(tile);
      default:
        return 'Status unknown';
    }
  };

  handleClick = () => {
    const { tile, history } = this.props;
    const tileRoute = `/tile/${tile.id}`;
    history.push(tileRoute);
  };

  // not a great way to avoid overlapping text in a card block
  // Mineral bug
  shortenDescription = description => {
      console.log(description);
      if (description == null ){
        return description;
      }
    if (!description.isEmpty() || description.length > 180) {
      return `${description.substring(0, 177)}...`;
    }
    return description;
  };

  shortenCommithash = hash => {
    if (hash == null) {
      return hash;
    }
    if ( hash.length > 10) {
      return `${hash.substring(0, 10)}...`;
    }
    return hash;
  };

  render() {
    const { tile } = this.props;
    const repoUrl = <Link href={`https://github.com/zowe/${  tile.repository}`}>
        {`https://github.com/zowe/${  tile.repository}`}
  </Link>
    return (
      <Card key={tile.id} className="grid-tile pop grid-item" onClick={this.handleClick} data-testid="tile">
        <CardTitle data-testid="tile-title" subtitle={repoUrl}>
          {tile.name}
        </CardTitle>
        <CardBlock className="commit-hash">
          Commit Hash:
          <Link href="http://example.com">
              {this.shortenCommithash(tile.currentRelease.commitHash)}
          </Link>
        </CardBlock>
        <CardBlock className="tile-notes">{tile.currentRelease.notes}</CardBlock>
        <CardStatus variant="danger" className="grid-tile-status">
          Version : {tile.currentRelease.version}
        </CardStatus>
        <CardStatus variant="success" className="grid-tile-release">
          Released : {tile.currentRelease.releaseDate}
        </CardStatus>
      </Card>
    );
  }
}

