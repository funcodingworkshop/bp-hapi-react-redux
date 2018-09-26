import axios from '../../config/axios-instance-node';
import { serverConsoleError } from '../../utils/server-console-error';
import { HTTP_ERROR_400 } from '../../constants';
import { authJwtCookieConfig } from '../../config/auth-jwt-cookie';

const { tokenName: jwtTokenName } = authJwtCookieConfig;

// Fetch Account
const registerFetchAccount = async (server, options) => {
  const {
    apiConfig: {
      method, path, methodUrl, url
    }
  } = options;

  const handler = async (request, h) => {
    try {
      const authCookieValue = request.state[jwtTokenName];
      const { data: { payload: accountInfo } } = await axios({
        method: methodUrl, url, data: { token: authCookieValue }
      });
      return h.response({
        uid: accountInfo.uid,
        permissions: accountInfo.permissions
      });
    } catch (e) {
      serverConsoleError(e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const fetchAccountPlugin = { name: 'fetchAccountPlugin', register: registerFetchAccount };
