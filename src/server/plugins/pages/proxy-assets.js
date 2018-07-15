const register = async (server, options) => {
  const { host, port } = options;

  const handler = {
    proxy: {
      host,
      port,
      protocol: 'http'
    }
  };

  server.route({
    path: '/assets/{param*}',
    method: 'GET',
    handler
  });
};

const pluginExport = {
  name: 'proxy-assets',
  register
};

export default pluginExport;
