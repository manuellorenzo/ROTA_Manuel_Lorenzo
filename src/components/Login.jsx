import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image } from 'semantic-ui-react'

import history from '../history';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    goToRoute(route) {
        history.push(route);
    }

    render() {
        return (
            <div>
                <Grid verticalAlign="middle">
                    <Grid.Row centered>
                        <Grid.Column width={6}>
                            <Image centered size='medium' src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column mobile={14} tablet={7} computer={5}>
                            <Form>
                                <Form.Field>
                                    <Form.Input label="Username" placeholder="Username" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Password" placeholder="Password" />
                                </Form.Field>
                                <Button fluid primary onClick={() => this.goToRoute("/menu")} type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
export default Login;