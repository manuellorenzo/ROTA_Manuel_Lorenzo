import React, { Component } from 'react';
import { Input, Button, Grid, Form, Image, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';

import history from '../history';
import firebase, { auth, provider } from '../firebase.js';
import * as loginActions from '../actions/loginActions';
import authApi from '../api/authApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: null,
            err: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    componentDidMount() {
        console.log("LOGIN COMPONENT -- THIS.PROPS.USER -- ", this.props.user);
    }
    goToRoute(route) {
        history.push(route);
    }

    handleInputChange(name, value) {
        this.setState({ [name]: value })
    }

    logIn() {
        auth.signInWithEmailAndPassword(this.state.username, this.state.password)
            .then((result) => {
                console.log("LOGIN COMPONENT -- LOGIN -- RESULT -- ", result.user)
                const user = result.user;
                this.setState({
                    err: ''
                }, () => authApi.createJWT(user.uid).then(result => console.log("LOGIN COMPONENT TOKEN -- ",result.data.token)).then(() => this.props.editUser(user)));
            }).catch(err => this.setState({ err: err.message })
            );
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
                            <Form onSubmit={() => this.logIn()}>
                                <Form.Field>
                                    <Form.Input label="Username" name="username" placeholder="Username" value={this.state.username} onChange={(e) => this.handleInputChange(e.target.name, e.target.value)} />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input type="password" name="password" label="Password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleInputChange(e.target.name, e.target.value)} />
                                </Form.Field>
                                <Button fluid primary type='submit'>Submit</Button>
                                {this.state.err !== '' ?
                                    <Message negative>
                                        <Message.Header>{this.state.err}</Message.Header>
                                    </Message>
                                    : this.props.user !== null ?
                                        <Message positive>
                                            <Message.Header>User logged succesfully</Message.Header>
                                        </Message> : null}
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log('maptostate', state);
    return {
        // You can now say this.props.workers
        user: state.loginReducer.loggedUser,
    }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        editUser: user => dispatch(loginActions.editUser(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);