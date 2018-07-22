import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './redux/reducers';
import Root from './root';

const history = createHistory();
const middleware = routerMiddleware(history);

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(middleware)));

ReactDOM.render(<Root store={ store } history={ history } />, document.getElementById('react-app'));
