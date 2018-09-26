import { serverConsoleError } from '../../utils/server-console-error';
import { HTTP_ERROR_400 } from '../../constants';
import axios from '../../config/axios-instance-node';
import { authJwtCookieConfig } from '../../config/auth-jwt-cookie';

const { tokenName: jwtTokenName } = authJwtCookieConfig;

// Sign In
const registerSignIn = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const { data: { payload: jwtToken } } = await axios({ method, url, data: request.payload });
      return h.response(jwtToken).state(jwtTokenName, jwtToken);
    } catch (e) {
      serverConsoleError('signInPlugin', e);
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

// Sign Up
const registerSignUp = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const { data: { payload: jwtToken } } = await axios({ method, url, data: request.payload });
      return h.response(jwtToken).state(jwtTokenName, jwtToken);
    } catch (e) {
      serverConsoleError('signUpPlugin', e);
      if (e.response.data) {
        return h.response(e.response.data).code(400);
      }
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const signUpPlugin = { name: 'signUpPlugin', register: registerSignUp };

// Sign Out
const registerSignOut = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    try {
      return h.response({}).state(jwtTokenName, '');
    } catch (e) {
      serverConsoleError('signOutPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const signOutPlugin = { name: 'signOutPlugin', register: registerSignOut };
