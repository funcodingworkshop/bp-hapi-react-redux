import Hapi from 'hapi';
import mongoose from 'mongoose';
import getPlugins from './plugins';
import getConfig from './config/config';

const config = getConfig();
const { mongoDbHost, mongoDbUser, mongoDbPass } = config.server;
// mongoose.connect(`mongodb://${mongoDbHost}/test`);
mongoose.connect(`mongodb://${mongoDbUser}:${mongoDbPass}@${mongoDbHost}/test`);

const db = mongoose.connection;

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.serviceHost
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
