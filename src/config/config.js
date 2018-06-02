const appId = 'ona-ao-ui';
const useMocks = process.env.APP_MOCKS === '1';
const serviceHost = process.env.SERVICE_HOST || '0.0.0.0';
const mongoDbHost = process.env.MONGODB_HOST || '0.0.0.0';
const mongoDbUser = process.env.MONGODB_USER;
const mongoDbPass = process.env.MONGODB_PASS;
const env = process.env.NODE_ENV || 'localhost';
const { PROD_BUILD } = process.env;
console.log('useMocks', useMocks); // eslint-disable-line
console.log('serviceHost', serviceHost); // eslint-disable-line
console.log('mongoDbHost', mongoDbHost); // eslint-disable-line
console.log('mongoDbUser', mongoDbUser); // eslint-disable-line
console.log('mongoDbPass', mongoDbPass); // eslint-disable-line
console.log('env', env); // eslint-disable-line
console.log('PROD_BUILD', PROD_BUILD); // eslint-disable-line

export default function getConfig() {
  return {
    useMocks,
    env,
    appId,
    basePath: '',
    devtools: true,

    server: {
      serviceHost,
      mongoDbHost,
      mongoDbUser,
      mongoDbPass,
      mongoDbName: 'testDb',
      port: 8080,
      proxyClientIpHeader: 'wl-proxy-client-ip',
      customerIdHeader: 'customerid',
      requestTimeout: 60000
    },

    logger: {
      console: {
        level: 'info',
        prettyPrint: true
      },
      logstash: {
        level: 'info',
        prettyPrint: true,
        port: 5959,
        timeout_connect_retries: 15000,
        max_connect_retries: -1
      },
      skipEndpoints: [],
      maskFields: []
    },

    jwt: {
      secret: 'NeverShareYourSecret',
      expiresIn: 86400
    },

    services: {
      sendCode: {
        method: 'POST',
        path: '/send-code',
        url: `http://${serviceHost}/ona-pipe-api/getPhoneConfirm`
      },
      verifyCode: {
        method: 'POST',
        path: '/verify-code',
        url: `http://${serviceHost}/ona-pipe-api/checkPhoneConfirm`
      },
      validateJwt: {
        method: 'POST',
        path: '/validate-jwt'
      },
      courses: {
        method: 'GET',
        path: '/courses'
      },
      coursePost: {
        method: 'POST',
        path: '/courses'
      },
      course: {
        method: 'GET',
        path: '/courses/{courseId}'
      },
      coursePatch: {
        method: 'PATCH',
        path: '/courses/{courseId}'
      },
      courseDelete: {
        method: 'DELETE',
        path: '/courses/{courseId}'
      }
    }
  };
}
