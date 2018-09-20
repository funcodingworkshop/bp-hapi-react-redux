import { consoleError } from '../../../client/utils/console-error';
import { HTTP_ERROR_400 } from '../../constants';
import axios from '../../config/axios-instance-node';

// Sign In
const registerSignIn = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const { data: jwtToken } = await axios({ method, url, data: request.payload });
      console.log('jwtToken', jwtToken);
      return h.response(jwtToken);
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
