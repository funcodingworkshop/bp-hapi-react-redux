import Boom from 'boom';

const UNAUTHORIZED_PATHS = [
  '/',
  '/favicon.ico'
];

const UNAUTHORIZED_DIR = '/assets/';

function allowUnauthorized(path) {
  if (path.substr(0, UNAUTHORIZED_DIR.length) === UNAUTHORIZED_DIR) {
    return true;
  }
  return UNAUTHORIZED_PATHS.includes(path);
}

export function jwtAuthScheme(server, options) {
  const authenticate = (request, h) => {
    if (allowUnauthorized(request.path)) {
      return h.continue;
    }
    console.log('path', request.path);
    console.log(options);
    // return h.authenticated({ credentials: { user: 'good' } });
    return Boom.badRequest('invalid query');
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
