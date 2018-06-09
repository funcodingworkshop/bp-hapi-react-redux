import pathFunc from 'path';

const register = async (server) => {
  const method = 'GET';
  const path = '/assets/{param*}';

  const handler = {
    directory: {
      path: pathFunc.join(process.cwd(), '.build', 'src', 'assets')
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'static-assets',
  version: '1.0.0',
  register
};

export default pluginExport;
