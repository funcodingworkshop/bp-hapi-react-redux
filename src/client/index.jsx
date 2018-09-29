import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AppRoutes from './routes/app-routes';
import configureStore from '../shared/configure-store';

const history = createHistory({
  basename: ''
});

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
