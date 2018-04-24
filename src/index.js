import './semantic/dist/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import App from './components/App'
import Login from './components/Login';
import Calendar from './components/Calendar';

const history = createBrowserHistory();
const store = "";//createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/app" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={App} />
                    <Route path="/calendar" component={Calendar} />
                </div>
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
)