import Boom from 'boom';
import axios from '../../config/axios-instance-node';
import { serverConsoleError } from '../../utils/server-console-error';
import { ERR_MSG_HTTP_ERROR_400 } from '../../constants';

// Elasticsearch
const register = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const { data } = await axios({ method, url, data: request.payload });
      return h.response(data).code(200);
    } catch (e) {
      serverConsoleError(e);
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
    }
  };

  server.route({ method, path, handler });
};

export const elasticsearchPlugin = { name: 'elasticsearchPlugin', register };
