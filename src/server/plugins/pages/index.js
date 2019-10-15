import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import configureStore from '../../../client/configure-store';
import { serverConsoleError } from '../../utils/server-console-error';
import { HTTP_ERROR_500 } from '../../constants';
import AppRoutes from '../../../client/routes/app-routes';

const initialState = {
  settings: {
    test: 'some server state'
  }
};

const register = async (server, options) => {
  const {
    apiConfig: { method },
    buildConfig: { targetDir }
  } = options;

  const handler = async (request) => {
    try {
      const sheetsRegistry = new SheetsRegistry();
      const sheetsManager = new Map();
      const theme = createMuiTheme({
        palette: {
          primary: purple,
          type: 'light'
        }
      });
      const generateClassName = createGenerateClassName();

      const store = configureStore()(initialState);
      const jsx = (
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <ReduxProvider store={ store }>
              <StaticRouter context={ {} } location={ request.url.path }>
                <AppRoutes />
              </StaticRouter>
            </ReduxProvider>
          </MuiThemeProvider>
        </JssProvider>
      );
      const appCode = renderToString(jsx);
      const appCss = sheetsRegistry.toString();
      const appState = JSON.stringify(store.getState());

      const template = handlebars.compile(fs.readFileSync(path.join(process.cwd(), targetDir, 'index.hbs'), 'utf8'));
      const context = {
        title: 'J123 - Messaging Platform', appCode, appCss, appState
      };
      return template(context);
    } catch (e) {
      serverConsoleError(e);
      return HTTP_ERROR_500;
    }
  };

  server.route({ method, path: '/', handler });
  server.route({ method, path: '/{param*}', handler });
};

const pluginExport = {
  name: 'index-page',
  version: '1.0.0',
  register
};

export default pluginExport;
