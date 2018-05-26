import sendCode from './plugins/send-phone-plugin';
import verifyCode from './plugins/send-sms-plugin';
import validateJwt from './plugins/validate-jwt-plugin';
import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/courses-api';

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
      plugin: sendCode,
      options: { apiConfig: config.services.sendCode }
    },
    {
      plugin: verifyCode,
      options: { apiConfig: config.services.verifyCode, jwtConfig: config.jwt }
    },
    {
      plugin: validateJwt,
      options: { apiConfig: config.services.validateJwt, jwtConfig: config.jwt }
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
