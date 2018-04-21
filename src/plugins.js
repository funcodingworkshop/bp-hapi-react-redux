import sendCode from './plugins/send-phone-plugin';
import verifyCode from './plugins/send-sms-plugin';
import validateJwt from './plugins/validate-jwt-plugin';

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
      options: {
        apiConfig: config.services.sendCode
      }
    },
    {
      plugin: verifyCode,
      options: {
        apiConfig: config.services.verifyCode,
        jwtConfig: config.jwt
      }
    },
    {
      plugin: validateJwt,
      options: {
        apiConfig: config.services.validateJwt,
        jwtConfig: config.jwt
      }
    }
  ];
};

export default getPlugins;
