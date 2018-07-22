import jwt from 'jsonwebtoken';
import axios from '../../config/axios-instance-node';
import { HTTP_ERROR_400, HTTP_ERROR_500 } from '../../constants';

const register = async (server, options) => {
  const { apiConfig: { method, path, url }, jwtConfig: { secret, expiresIn } } = options;

  const handler = async (request) => {
    try {
      console.log('headers', request.headers); // eslint-disable-line no-console
      console.log('payload', request.payload); // eslint-disable-line no-console
      const { payload: { sms: password, ref: reference, permissions } } = request;
      // TODO move to service
      const data = { password, reference };
      const result = await axios({ method, url, data });
      const payload = {
        username: result.data.phone,
        permissions
      };
      return jwt.sign(payload, secret, { expiresIn });
    } catch (e) {
      console.error('!!! error', e); // eslint-disable-line no-console
      return e.response && e.response.status >= 500 ? HTTP_ERROR_500 : HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'send-sms',
  version: '1.0.0',
  register
};

export default pluginExport;
