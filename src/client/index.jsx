import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
import Root from './root';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(reducers, applyMiddleware(middleware));

ReactDOM.render(<Root store={ store } history={ history } />, document.getElementById('react-app'));
