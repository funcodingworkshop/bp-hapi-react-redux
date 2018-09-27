import Hapi from 'hapi';
import visionPlugin from 'vision';
import Handlebars from 'handlebars';
import inertPlugin from 'inert';
import h2o2Plugin from 'h2o2';
import indexPagePlugin from './plugins/pages/index';
import staticAssetsPlugin from './plugins/pages/static-assets';
import proxyAssetsPlugin from './plugins/pages/proxy-assets';
import getPlugins from './plugins';
import getConfig from './config/default';
import { jwtAuthScheme } from './auth/jwt-auth-scheme';
import { authJwtCookieConfig } from './config/auth-jwt-cookie';

const config = getConfig();

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host
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

  // Auth
  server.auth.scheme('jwt-auth-scheme', jwtAuthScheme);
  server.auth.strategy('jwt-auth', 'jwt-auth-scheme', config.services.auth.verifyJwt);
  server.auth.default('jwt-auth');

  const plugins = getPlugins(config);
  await server.register(plugins);

  // Cookie
  server.state(authJwtCookieConfig.tokenName, {
    ttl: authJwtCookieConfig.expiresIn,
    isHttpOnly: true,
    isSecure: authJwtCookieConfig.isSecure,
    path: '/'
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
  // console.log(`Config: ${JSON.stringify(config)}`); // eslint-disable-line
};

process.on('unhandledRejection', (err) => {
    console.error(err); // eslint-disable-line
  process.exit(1);
});

init();
