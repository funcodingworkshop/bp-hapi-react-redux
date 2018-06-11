const register = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async (request, h) => (h.view('index', {
    title: 'Hapi React Redux Boilerplate',
    subtitle: 'Howdy, my friend!'
  }));

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'index-page',
  version: '1.0.0',
  register
};

export default pluginExport;
