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
import Report from './components/MonthlyReport';

import history from './history';
import reducer from './reducers';
import configureStore from './store/configureStore';
import { loadConf } from './actions/configurationsActions';

const store = configureStore();
store.dispatch(loadConf());

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
                <Route path="/report" component={Report}/>
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
)