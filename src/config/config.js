const appId = 'ona-ao-ui';
const APP_MOCKS = process.env.APP_MOCKS || '1';
const SERVICE_HOST = process.env.SERVICE_HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'localhost';
const { PROD_BUILD } = process.env;

console.log('APP_MOCKS', APP_MOCKS); // eslint-disable-line
console.log('SERVICE_HOST', SERVICE_HOST); // eslint-disable-line
console.log('NODE_ENV', NODE_ENV); // eslint-disable-line
console.log('PROD_BUILD', PROD_BUILD); // eslint-disable-line

export default function getConfig() {
  const useMocks = APP_MOCKS === '1';
  const env = NODE_ENV;
  const serviceHost = SERVICE_HOST || 'localhost';

  return {
    useMocks,
    env,
    appId,
    basePath: '',
    devtools: true,

    server: {
      serviceHost,
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
