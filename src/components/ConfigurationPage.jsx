import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Menu, Container, Header, Divider } from 'semantic-ui-react'

import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import history from '../history';

class ConfigurationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '10:00'
        };
    }

    onChange = time => this.setState({ time })

    render() {
        return (
            <div>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h2">Compensations</Header>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Base money" placeholder="Base money" />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Base time" placeholder="Base time" />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Money multiplier" placeholder="Money multiplier" />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Time multiplier" placeholder="Time multiplier" />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <Form.Field >
                                                    <Form.Input label="Week money" placeholder="Week money" />
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <Form.Field>
                                                    <Form.Input label="Weekend money" placeholder="Weekend money" />
                                                </Form.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h2">Time configuration</Header>
                                <Divider />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8} floated="left">
                                                <TimePicker start="10:00" end="21:00" step={1} />
                                            </Grid.Column>
                                            <Grid.Column width={8} floated="right">
                                                <TimePicker start="10:00" end="21:00" step={30} />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button floated="right" primary type='submit'>Save changes</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}
export default ConfigurationPage;