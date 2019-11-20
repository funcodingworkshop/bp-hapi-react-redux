import { signInPlugin, signUpPlugin, signOutPlugin } from './plugins/api/auth-api';
import { fetchAccountPlugin } from './plugins/api/account-api';
import {
  coursesPlugin,
  coursePlugin,
  coursePostPlugin,
  courseDeletePlugin,
  coursePatchPlugin
} from './plugins/api/courses-api';

import {
  clientsPlugin,
  clientPlugin,
  clientPostPlugin,
  clientDeletePlugin,
  clientPatchPlugin
} from './plugins/api/clients-api';

const getPlugins = config => {
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
    },
    {
      plugin: coursesPlugin,
      options: { apiConfig: config.services.courses }
    },
    {
      plugin: coursePlugin,
      options: { apiConfig: config.services.course }
    },
    {
      plugin: coursePostPlugin,
      options: { apiConfig: config.services.coursePost }
    },
    {
      plugin: courseDeletePlugin,
      options: { apiConfig: config.services.courseDelete }
    },
    {
      plugin: coursePatchPlugin,
      options: { apiConfig: config.services.coursePatch }
    },
    {
      plugin: clientsPlugin,
      options: { apiConfig: config.services.clients }
    },
    {
      plugin: clientPlugin,
      options: { apiConfig: config.services.client }
    },
    {
      plugin: clientPostPlugin,
      options: { apiConfig: config.services.clientPost }
    },
    {
      plugin: clientDeletePlugin,
      options: { apiConfig: config.services.clientDelete }
    },
    {
      plugin: clientPatchPlugin,
      options: { apiConfig: config.services.clientPatch }
    }
  ];
};

export default getPlugins;
