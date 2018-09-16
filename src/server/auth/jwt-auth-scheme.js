import Boom from 'boom';

export function jwtAuthScheme(server, options) {
  const authenticate = (request, h) => {
    console.log(options);
    // return h.authenticated({ credentials: { user: 'good' } });
    return Boom.badRequest('invalid query');
  };
  const response = (request, h) => {
    console.log(request.auth);
    // h.header('Server-Authorization', 'some_header');
    return h.continue;
  };
  return {
    authenticate,
    response
  };
}
