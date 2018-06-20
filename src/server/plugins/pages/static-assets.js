import pathFunc from 'path';

const register = async (server) => {
  const method = 'GET';
  const pathInBrowser = '/{param*}';
  const pathSystem = pathFunc.join(process.cwd(), '.build', 'client');

  const handler = {
    directory: {
      path: pathSystem
    }
  };

  server.route({
    method,
    path: pathInBrowser,
    handler
  });
};

const pluginExport = {
  name: 'static-assets',
  version: '1.0.0',
  register
};

export default pluginExport;
