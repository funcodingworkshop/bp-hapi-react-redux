import Hapi from 'hapi';
import mongoose from 'mongoose';
import getPlugins from './plugins';
import getConfig from './config/config'

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

const init = async () => {
  const config = getConfig();
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

db.on('error', (e) => {
  console.error('MongoDB connection error:', e); // eslint-disable-line no-console
});
db.once('open', () => {
  console.log(`MongoDB connection success`); // eslint-disable-line
  init();
});
