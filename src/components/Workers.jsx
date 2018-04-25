import React, { Component } from 'react';
import {List, Image} from 'semantic-ui-react';

class Workers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <List divided verticalAlign='middle'>
                    <List.Item>
                        <Image avatar src='/assets/images/avatar/small/daniel.jpg' />
                        <List.Content>
                            <List.Header as='p'>Daniel Louise</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='/assets/images/avatar/small/stevie.jpg' />
                        <List.Content>
                            <List.Header as='p'>Stevie Feliciano</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='/assets/images/avatar/small/elliot.jpg' />
                        <List.Content>
                            <List.Header as='p'>Elliot Fu</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
            </div>
        )
    }
}
export default Workers;