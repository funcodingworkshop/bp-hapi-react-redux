import { consoleError } from '../../../client/utils/console-error';
import { HTTP_ERROR_400 } from '../../constants';
import axios from '../../config/axios-instance-node';
import { authCookieConfig } from '../../config/auth-cookie';

// Sign In
const registerSignIn = async (server, options) => {
  const { apiConfig: { method, path, url }, authCookieConfig: { tokenName } } = options;

  const handler = async (request, h) => {
    try {
      const { data: { payload: jwtToken } } = await axios({ method, url, data: request.payload });
      return h.response(jwtToken).state(tokenName, jwtToken);
    } catch (e) {
      consoleError(e);
      // TODO use Boom
      if (e.response.data) {
        return h.response(e.response.data).code(400);
      }
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const signInPlugin = { name: 'signInPlugin', register: registerSignIn };

// User Info
const registerUserInfo = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const authCookieValue = request.state[authCookieConfig.tokenName];
      const { data: { payload: userInfo } } = await axios({ method: 'POST', url, data: { token: authCookieValue } });
      console.log('userInfo url', url);
      console.log('userInfo', userInfo);
      return h.response({
        uid: userInfo.uid,
        permissions: userInfo.permissions
      });
    } catch (e) {
      consoleError(e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const userInfoPlugin = { name: 'userInfoPlugin', register: registerUserInfo };
