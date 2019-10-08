import { CardStatus } from 'mineral-ui';
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

    handleClick = () => {
        const { tile, history } = this.props;
        const tileRoute = `/tile/${tile.id}`;
        history.push(tileRoute);
    };

    // not a great way to avoid overlapping text in a card block
    // Mineral bug
    shortenDescription = description => {
        if (description.length > 180) {
            return `${description.substring(0, 177)}...`;
        }
        return description;
    };

    render() {
        const { tile } = this.props;

        return (
            <Card key={tile.id} className="grid-tile pop grid-item" onClick={this.handleClick} data-testid="tile">
                <CardTitle data-testid="tile-title">{tile.title}</CardTitle>
                <CardBlock className="tile">{this.shortenDescription(tile.description)}</CardBlock>
            </Card>
        );
    }
}
