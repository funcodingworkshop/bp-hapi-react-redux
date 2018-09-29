import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { serverConsoleError } from '../../utils/server-console-error';
import { HTTP_ERROR_500 } from '../../constants';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import Page404 from '../../../client/components/page404/page404';
// import source from './index.hbs';

const register = async (server, options) => {
  const {
    apiConfig: { method },
    buildConfig: { targetDir }
  } = options;

  const handler = async () => {
    try {
      const template = handlebars.compile(fs.readFileSync(path.join(process.cwd(), targetDir, 'index.hbs'), 'utf8'));
      // const template = handlebars.compile(source);
      const context = { title: 'My New React App' };
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
