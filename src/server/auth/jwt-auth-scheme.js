import Boom from 'boom';

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
  const authenticate = (request, h) => {
    if (allowUnauthorized(request.path)) {
      return h.continue;
    }
    console.log('path', request.path);
    console.log(options);
    // return h.authenticated({ credentials: { user: 'good' } });
    return Boom.unauthorized('invalid query');
    // return h.redirect(PAGES.signIn.path);
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
