import React, { Component } from 'react';
import Text from 'mineral-ui/Text';
import Dropdown from 'mineral-ui/Dropdown';
import Button from 'mineral-ui/Button';
import Card, { CardBlock, CardTitle} from 'mineral-ui/Card';

let value = require('../mocked-response');
console.log(value['binaryDependencies']['sourceDependencies'][0]['componentGroup'])
export default  class Dashboard extends Component {

    getZoweVersion = () => {

        let manifesto = [{
            text: value["name"],
        }];
        return manifesto;
    };

    getZoweComponents = () => {


    }
    render() {
        return (

            <div>
                <Text as="h2">Zowe Components Catalog</Text>
                <Dropdown data={this.getZoweVersion()}>
                    <Button>Zowe versions</Button>
                </Dropdown>
                <br/>
                <br/>
                <Card>
                    <CardTitle>Card Title</CardTitle>
                    <CardBlock>{value['binaryDependencies']['sourceDependencies'][0]['componentGroup']}</CardBlock>
                </Card>
            </div>
        )
    }


}

