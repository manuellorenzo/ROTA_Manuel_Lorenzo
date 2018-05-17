import './semantic/dist/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Switch } from 'react-router-dom'

import App from './components/App'
import Login from './components/Login';
import Calendar from './components/Calendar';
import HorizontalMenu from './components/Menu';

import history from './history';
import reducer from './reducers'
import configureStore from './store/configureStore';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/app" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={App} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/menu" component={HorizontalMenu} />
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
)