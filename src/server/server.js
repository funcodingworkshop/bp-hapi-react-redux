import Hapi from 'hapi';
import mongoose from 'mongoose';
import visionPlugin from 'vision';
import Handlebars from 'handlebars';
import inertPlugin from 'inert';
import h2o2Plugin from 'h2o2';
import indexPagePlugin from './plugins/pages/index';
import staticAssetsPlugin from './plugins/pages/static-assets';
import proxyAssetsPlugin from './plugins/pages/proxy-assets';
import getPlugins from './plugins';
import getConfig from './config/config';

const config = getConfig();
const {
  mongoDbHost,
  mongoDbUser,
  mongoDbPass,
  mongoDbName
} = config.server;
if (mongoDbUser && mongoDbPass) {
  mongoose.connect(`mongodb://${mongoDbUser}:${mongoDbPass}@${mongoDbHost}/${mongoDbName}`);
} else {
  mongoose.connect(`mongodb://${mongoDbHost}/${mongoDbName}`);
}

const db = mongoose.connection;

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.serviceHost
  });

  if (config.useMocks) {
        require('./mock/mock'); // eslint-disable-line
  }

  // Vision is used for adding templating engine
  await server.register(visionPlugin);
  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: 'plugins/pages'
  });
  // Serving html file - src/server/plugins/pages/index.html
  await server.register({
    plugin: indexPagePlugin,
    options: { apiConfig: config.services.indexPage }
  });

  // Proxy Plugin
  await server.register({ plugin: h2o2Plugin });

  if (config.appModeDev) {
    // Plugin for proxy webpack dev server
    await server.register({
      plugin: proxyAssetsPlugin,
      options: { host: config.proxyAssets.host, port: config.proxyAssets.port }
    });
  } else {
    // Plugin for serving static content
    await server.register(inertPlugin);
    await server.register({
      plugin: staticAssetsPlugin,
      options: { appModeDev: config.appModeDev }
    });
  }

  const plugins = getPlugins(config);
  await server.register(plugins);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
  // console.log(`Config: ${JSON.stringify(config)}`); // eslint-disable-line
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
