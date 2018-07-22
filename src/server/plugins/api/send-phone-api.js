import axios from '../../config/axios-instance-node';
import { HTTP_ERROR_400, HTTP_ERROR_500 } from '../../constants';

const register = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request) => {
    try {
      console.log('headers', request.headers); // eslint-disable-line no-console
      console.log('payload', request.payload); // eslint-disable-line no-console
      const result = await axios({ method, url, data: request.payload });
      return result.data;
    } catch (e) {
      console.error('!!! error', e); // eslint-disable-line no-console
      return e.response && e.response.status >= 500 ? HTTP_ERROR_500 : HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'send-phone',
  version: '1.0.0',
  register
};

export default pluginExport;
