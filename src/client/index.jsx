import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import reducers from './redux/reducers';
import rootSaga from './redux/sagas';
import Root from './root';
import AppRoutes from './containers/app-routes/app-routes';

// const history = createHistory();
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
// ReactDOM.hydrate(
//   <JssProvider generateClassName={generateClassName}>
//     <MuiThemeProvider theme={theme}>
//       <Page404 />
//     </MuiThemeProvider>
//   </JssProvider>,
//   document.getElementById('react-app')
// );
ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('react-app')
);
