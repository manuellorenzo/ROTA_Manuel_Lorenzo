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

    pruebaArrays() {
        let array = ["A","B", "C"];
        let array1 = [...array];
        let array2 = [...array];
        let array3 = [...array];
        array.map((itemA, indexA) => {
            if (indexA - 1 < 0) {
                array2[array2.length - 1] = itemA;
            } else {
                array2[indexA - 1] = itemA;
            }
        });
        array.map((itemA, indexA) => {
            if (indexA +1 >= array3.length) {
                array3[0] = itemA;
            } else {
                array3[indexA +1] = itemA;
            }
        });
        console.log(array);
        console.log(array2);
        console.log(array3);
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
                            <Form onSubmit={() => this.goToRoute("/menu")} /*this.pruebaArrays()*/>
                                <Form.Field>
                                    <Form.Input label="Username" placeholder="Username" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label="Password" placeholder="Password" />
                                </Form.Field>
                                <Button fluid primary type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
export default Login;