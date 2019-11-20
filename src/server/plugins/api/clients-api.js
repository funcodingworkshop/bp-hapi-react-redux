import { HTTP_ERROR_400 } from '../../constants';
import { serverConsoleError } from '../../utils/server-console-error';
import axios from '../../config/axios-instance-node';
import { parseUrlFromTemplate } from '../../../client/utils/path';

// clients index
const registerClients = async (server, options) => {
  const {
    apiConfig: { method, path, url }
  } = options;

  const handler = async () => {
    try {
      const { data } = await axios({ method, url });
      return data;
    } catch (e) {
      serverConsoleError('clientsPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const clientsPlugin = { name: 'clientsPlugin', register: registerClients };

// read client
const registerClient = async (server, options) => {
  const {
    apiConfig: { method, path, url: urlTemplate }
  } = options;

  const handler = async (request, h) => {
    const { params: { clientId } = {} } = request;
    const url = parseUrlFromTemplate(urlTemplate, { clientId });
    try {
      const { data } = await axios({ method, url });
      return data;
    } catch (e) {
      serverConsoleError('clientPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const clientPlugin = { name: 'clientPlugin', register: registerClient };

// create client
const registerClientPost = async (server, options) => {
  const {
    apiConfig: { method, path, url }
  } = options;

  const handler = async (request, h) => {
    try {
      const { data } = await axios({ method, url, data: request.payload });
      return h.response(data).code(201);
    } catch (e) {
      serverConsoleError('clientPostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const clientPostPlugin = { name: 'clientPostPlugin', register: registerClientPost };

// delete client
const registerClientDelete = async (server, options) => {
  const {
    apiConfig: { method, path, url: urlTemplate }
  } = options;

  const handler = async (request, h) => {
    const { params: { clientId } = {} } = request;
    const url = parseUrlFromTemplate(urlTemplate, { clientId });
    try {
      await axios({ method, url });
      return h.response().code(204);
    } catch (e) {
      serverConsoleError('clientDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const clientDeletePlugin = { name: 'clientDeletePlugin', register: registerClientDelete };

// update client
const registerClientPatch = async (server, options) => {
  const {
    apiConfig: { method, path, url: urlTemplate }
  } = options;

  const handler = async (request, h) => {
    const {
      params: { clinetId } = {},
      payload: { client }
    } = request;
    console.log('message from boris', client);
    try {
      const url = parseUrlFromTemplate(urlTemplate, { clinetId });
      const { data } = await axios({ method, url, data: client });
      return h.response(data).code(200);
    } catch (e) {
      serverConsoleError('clientPatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const clientPatchPlugin = { name: 'clientPatchPlugin', register: registerClientPatch };
