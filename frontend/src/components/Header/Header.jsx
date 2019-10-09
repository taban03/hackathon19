import React, { Component } from 'react';
import { Link, Text, Dropdown, Button } from 'mineral-ui';

import productImage from '../../assets/images/zowe-catatalog-logo.png';
import githubImage from '../../assets/images/github.png';
import './Header.css';

export default class Header extends Component {


    // getVersions = () => {
    //     fetch('https://localhost:80/api/v1/catalogs/versions')
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({ versions: data })
    //         })
    // }
    componentWillMount() {
        const {fetchVersions} = this.props;
        fetchVersions();
        console.log(this.props)
    }

    render() {
        const dashboard = '/ui/v1/zowecatalog/#/dashboard';
        const {versions, error} = this.props;
        // const  text  = {...versions.version};
        // for (i = 0; i < versions.length; i++)
        //     const text =
        // versions.text = versions.version;
        const data = versions.map(o => ({text: o.version}));

        console.log(data)
        // const {data, text = versions.map(o => ({text: o.version}))} = versions;
        // const data =
        //     [
        //         {
        //             text: versions,
        //             // onClick: event => { console.log(event); }
        //         }
        //     ]
        console.log("VERSIONEEEE")
        // console.log(data)
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

