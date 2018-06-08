import './semantic/dist/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './components/App'
import Login from './components/Login';
import Calendar from './components/Calendar';
import HorizontalMenu from './components/Menu';
import Report from './components/MonthlyReport';

import history from './history';
import reducer from './reducers';
import configureStore from './store/configureStore';
import { loadConf } from './actions/configurationsActions';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Redirect to="/" />
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
)