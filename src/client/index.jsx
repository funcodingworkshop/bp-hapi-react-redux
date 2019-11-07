import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import AppRoutes from './routes/app-routes';
import configureStore from './configure-store';

const history = createBrowserHistory({
  basename: ''
});

const initialState = window.REDUX_DATA;
const store = configureStore()(initialState, history);

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: purple,
    type: 'light'
  }
});

ReactDOM.hydrate(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <AppRoutes />
      </ConnectedRouter>
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById('react-app')
);
