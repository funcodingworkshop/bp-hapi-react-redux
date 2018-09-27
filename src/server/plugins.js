import { signInPlugin, signUpPlugin, signOutPlugin } from './plugins/api/auth-api';
import { fetchAccountPlugin } from './plugins/api/account-api';

const getPlugins = (config) => {
  // eslint-disable-next-line no-unused-vars
  const loggerConfig = {
    appId: config.appId,
    devtools: config.devtools,
    server: config.server,
    logger: config.logger
  };

  return [
    {
      plugin: signInPlugin,
      options: { apiConfig: config.services.auth.signIn }
    },
    {
      plugin: signUpPlugin,
      options: { apiConfig: config.services.auth.signUp }
    },
    {
      plugin: signOutPlugin,
      options: { apiConfig: config.services.auth.signOut }
    },
    {
      plugin: fetchAccountPlugin,
      options: { apiConfig: config.services.account }
    }
  ];
};

export default getPlugins;
