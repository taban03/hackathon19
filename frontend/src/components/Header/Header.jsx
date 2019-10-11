import React, { Component } from 'react';
import { Link, Text, Dropdown, Button } from 'mineral-ui';

import productImage from '../../assets/images/zowe-catatalog-logo.png';
import githubImage from '../../assets/images/github.jpeg';
import './Header.css';

export default class Header extends Component {

    componentWillMount() {
        const {fetchVersions} = this.props;
        fetchVersions();
    }

    handleClick = (e) => {
        const {updateVersionSuccess} = this.props;
        console.log(e.target.textContent)
        const newVersion = e.target.textContent;
        updateVersionSuccess(newVersion)
    }

    render() {
        const dashboard = '/ui/v1/zowecatalog/#/dashboard';
        const {versions, error} = this.props;
        const data = versions.map(o => ({text: o.version, onClick: event => { this.handleClick(event); }}));

        console.log(data)

        return (
            <div className="header">
                <div className="product-name">
                    <Link href={dashboard}>
                        <div className="app-icon-container">
                            <img id="logo" alt="Zowe Catalog Product Name" src={productImage} />
                        </div>
                    </Link>
                    <Link href={dashboard}>
                        <Text element="h3" color="#ffffff">
                            Zowe Components Catalog
                        </Text>
                    </Link>
                </div>
                <div className="right-icons">
                    <div className="dropdown">
                        <Dropdown data={data}>
                            <Button>Zowe Versions</Button>
                        </Dropdown>
                    </div>
                    <div className="icons-container">
                        <Link href="https://www.zowe.org">
                            <img id="logo2" alt="Zowe Catalog Product Name" src={productImage} />
                        </Link>
                    </div>
                    <div className="logout-container">
                        <Link href="https://github.com/zowe">
                            <img id="logo2" alt="Zowe Catalog GitHub Icon" src={githubImage} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

