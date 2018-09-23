import Boom from 'boom';
import { authCookieConfig } from '../config/auth-cookie';
import axios from '../config/axios-instance-node';
import { consoleError } from '../../client/utils/console-error';

const AUTHORIZED_DIR = '/api/';
const UNAUTHORIZED_PATHS = [
  '/api/sign-in',
  '/api/sign-up'
];

function allowUnauthorized(path) {
  if (UNAUTHORIZED_PATHS.includes(path)) {
    return true;
  }
  return path.substr(0, AUTHORIZED_DIR.length) !== AUTHORIZED_DIR;
}

export function jwtAuthScheme(server, options) {
  const { method, url } = options;
  const authenticate = async (request, h) => {
    if (allowUnauthorized(request.path)) {
      return h.continue;
    }
    console.log('path', request.path);
    try {
      const authCookieValue = request.state[authCookieConfig.tokenName];
      console.log('authCookieValue', authCookieValue);
      const { data: authResult } = await axios({ method, url, data: { token: authCookieValue } });
      console.log('authResult', authResult);
      if (authResult.payload) {
        const credentials = {
          uid: authResult.payload.uid,
          permissions: authResult.payload.permissions
        };
        return h.authenticated({ credentials });
      }
    } catch (e) {
      consoleError('jwtAuthScheme ERROR:', e);
    }
    return Boom.unauthorized('Please Sign In');
  };
  // if authenticate return h.continue response is skipped
  const response = (request, h) => {
    console.log('request.auth', request.auth);
    // h.header('Server-Authorization', 'some_header');
    return h.continue;
  };
  return {
    authenticate,
    response
  };
}
