import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, createMuiTheme, ServerStyleSheets } from '@material-ui/core/styles';
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

  const handler = async request => {
    try {
      const sheets = new ServerStyleSheets();
      const theme = createMuiTheme({
        palette: {
          primary: purple,
          type: 'light'
        }
      });

      const store = configureStore()(initialState);
      const jsx = sheets.collect(
        <ThemeProvider theme={theme}>
          <ReduxProvider store={store}>
            <StaticRouter context={{}} location={request.url.path}>
              <AppRoutes />
            </StaticRouter>
          </ReduxProvider>
        </ThemeProvider>
      );
      const appCode = renderToString(jsx);
      const appCss = sheets.toString();
      const appState = JSON.stringify(store.getState());

      const template = handlebars.compile(
        fs.readFileSync(path.join(process.cwd(), targetDir, 'index.hbs'), 'utf8')
      );
      const context = {
        title: 'J123 - Messaging Platform',
        appCode,
        appCss,
        appState
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
