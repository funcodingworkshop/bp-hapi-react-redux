import pathFunc from 'path';

const register = async (server, options) => {
  const { appModeDev } = options;
  const method = 'GET';
  const pathInBrowser = '/assets/{param*}';
  const pathSystem = appModeDev ? pathFunc.join(process.cwd(), 'src', 'client', 'assets')
    : pathFunc.join(process.cwd(), '.build', 'client', 'assets');

  const handler = {
    directory: {
      path: pathSystem
    }
  };

  server.route({ method, path: pathInBrowser, handler });
};

const pluginExport = {
  name: 'static-assets',
  version: '1.0.0',
  register
};

export default pluginExport;
