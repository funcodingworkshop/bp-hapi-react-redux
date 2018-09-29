import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as ReduxProvider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import reducers from './redux/reducers';
import rootSaga from './redux/sagas';
import Root from './root';
import AppRoutes from './routes/app-routes';
import configureStore from '../shared/configure-store';

const history = createHistory({
  basename: ''
});
// const middleware = routerMiddleware(history);
// const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(
//     middleware,
//     sagaMiddleware
//   ))
// );
// sagaMiddleware.run(rootSaga);

const initialState = window.REDUX_DATA;
const store = configureStore()(initialState, history);

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light'
  }
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

// ReactDOM.render(<Root store={ store } history={ history } />, document.getElementById('react-app'));

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <ReduxProvider store={ store }>
        <ConnectedRouter history={ history }>
          <AppRoutes />
        </ConnectedRouter>
      </ReduxProvider>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('react-app')
);
