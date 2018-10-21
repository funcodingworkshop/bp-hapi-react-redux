import Boom from 'boom';
import { serverConsoleError } from '../../utils/server-console-error';
import { ERR_MSG_HTTP_ERROR_400 } from '../../constants';
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
      if (e.response.data && e.response.data.statusCode) {
        return h.response(e.response.data).code(e.response.data.statusCode);
      }
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
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
      if (e.response.data && e.response.data.statusCode) {
        return h.response(e.response.data).code(e.response.data.statusCode);
      }
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
    }
  };

  server.route({ method, path, handler });
};

export const signUpPlugin = { name: 'signUpPlugin', register: registerSignUp };

// Sign Out
const registerSignOut = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = (request, h) => h.response({}).state(jwtTokenName, '');

  server.route({ method, path, handler });
};

export const signOutPlugin = { name: 'signOutPlugin', register: registerSignOut };
