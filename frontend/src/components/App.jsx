import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import HorizontalMenu from './Menu';

import * as loginActions from '../actions/loginActions';
import firebase, { auth, provider } from '../firebase.js';
import authApi from '../api/authApi';

function Logged(props) {
    const isLogged = props.isLogged;
    if (isLogged === true) {
        return <HorizontalMenu />;
    } else {
        return <Login />;
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.checkLastLogin = this.checkLastLogin.bind(this);
    }

    componentDidMount() {
        this.checkLastLogin();
    }

    checkLastLogin() {
        auth.onAuthStateChanged((user) => {
            console.log("APP COMPONENT -- USER -- ", user)
            if (user) {
                auth.currentUser.getIdToken(true).then(idToken => {
                    console.log("LOGIN COMPONENT ID TOKEN -- ", idToken);
                    authApi.createJWT(idToken)
                        .then(result => localStorage.setItem('jwt', result.data.token))
                        .then(() => this.props.editUser(user))
                }).catch(err => this.setState({ "err": err.message }))
            }
        });
    }
    render() {
        return (
            <div>
                <Logged isLogged={this.props.user !== null} />
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
const mapDispatchToProps = (dispatch) => {
    return {
        // You can now say this.props.createBook
        editUser: user => dispatch(loginActions.editUser(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);