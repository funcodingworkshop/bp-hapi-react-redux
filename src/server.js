import Hapi from 'hapi';
import getPlugins from './plugins';
import getConfig from './config/config';

const init = async () => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV); // eslint-disable-line
    console.log('process.env.PROD_BUILD', process.env.PROD_BUILD); // eslint-disable-line
    console.log('process.env.SERVICE_HOST', process.env.SERVICE_HOST); // eslint-disable-line
    console.log('process.env.APP_MOCKS', process.env.APP_MOCKS); // eslint-disable-line
  const config = getConfig(
    process.env.APP_MOCKS,
    process.env.SERVICE_HOST,
    process.env.HOST,
    process.env.BALANCER_HOST,
    process.env.NODE_ENV,
  );
  const server = Hapi.server({
    port: config.server.port,
    host: '0.0.0.0'
  });

  if (config.useMocks) {
        require('./mock/mock'); // eslint-disable-line
  }
  const plugins = getPlugins(config);
  await server.register(plugins);
  await server.start();
    console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
    console.log(`Config: ${JSON.stringify(config)}`); // eslint-disable-line
};

process.on('unhandledRejection', (err) => {
    console.error(err); // eslint-disable-line
  process.exit(1);
});

init();
