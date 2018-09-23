import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/api/courses-api';

import { signInPlugin, userInfoPlugin } from './plugins/api/auth-api';

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
      options: { apiConfig: config.services.auth.signIn, authCookieConfig: config.authCookie }
    },
    {
      plugin: userInfoPlugin,
      options: { apiConfig: config.services.userInfo }
    },
    {
      plugin: coursesPlugin,
      options: { apiConfig: config.services.courses }
    },
    {
      plugin: coursePostPlugin,
      options: { apiConfig: config.services.coursePost }
    },
    {
      plugin: coursePlugin,
      options: { apiConfig: config.services.course }
    },
    {
      plugin: coursePatchPlugin,
      options: { apiConfig: config.services.coursePatch }
    },
    {
      plugin: courseDeletePlugin,
      options: { apiConfig: config.services.courseDelete }
    }
  ];
};

export default getPlugins;
