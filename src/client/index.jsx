import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
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

// const theme = createMuiTheme({
//   primary: {
//     // light: will be calculated from palette.primary.main,
//     main: '#AD56D1'
//     // dark: will be calculated from palette.primary.main,
//     // contrastText: will be calculated to contrast with palette.primary.main
//   },
//   secondary: {
//     light: '#0066ff',
//     main: '#0044ff',
//     // dark: will be calculated from palette.secondary.main,
//     contrastText: '#ffcc00'
//   }
// });

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
