const appId = 'ona-ao-ui';
export default function getConfig(
  APP_MOCKS = 1,
  SERVICE_HOST = 'localhost',
  HOST = 'localhost',
  BALANCER_HOST = 'localhost',
  NODE_ENV = 'localhost',
) {
  const useMocks = APP_MOCKS === '1';
  const env = NODE_ENV;
  const serviceHost = SERVICE_HOST || HOST || 'localhost';
  const balancerHost = BALANCER_HOST || serviceHost;

  return {
    useMocks,
    env,
    appId,
    basePath: '',
    devtools: true,

    server: {
      serviceHost,
      balancerHost,
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
      }
    }
  };
}
