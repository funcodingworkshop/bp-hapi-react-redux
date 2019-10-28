import { HTTP_ERROR_400 } from '../../constants';
import { serverConsoleError } from '../../utils/server-console-error';
import axios from '../../config/axios-instance-node';
import { parseUrlFromTemplate } from '../../../client/utils/path';

// courses index
const registerCourses = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async () => {
    try {
      const { data } = await axios({ method, url });
      return data;
    } catch (e) {
      serverConsoleError('coursesPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const coursesPlugin = { name: 'coursesPlugin', register: registerCourses };


// read course
const registerCourse = async (server, options) => {
  const { apiConfig: { method, path, url: urlTemplate } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    const url = parseUrlFromTemplate(urlTemplate, { courseId });
    try {
      const { data } = await axios({ method, url });
      return data;
    } catch (e) {
      serverConsoleError('coursePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePlugin = { name: 'coursePlugin', register: registerCourse };


// create course
const registerCoursePost = async (server, options) => {
  const { apiConfig: { method, path, url } } = options;

  const handler = async (request, h) => {
    try {
      const { data } = await axios({ method, url, data: request.payload });
      return h.response(data).code(201);
    } catch (e) {
      serverConsoleError('coursePostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const coursePostPlugin = { name: 'coursePostPlugin', register: registerCoursePost };


// delete course
const registerCourseDelete = async (server, options) => {
  const { apiConfig: { method, path, url: urlTemplate } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    const url = parseUrlFromTemplate(urlTemplate, { courseId });
    try {
      await axios({ method, url });
      return h.response().code(204);
    } catch (e) {
      serverConsoleError('courseDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const courseDeletePlugin = { name: 'courseDeletePlugin', register: registerCourseDelete };


// update course
const registerCoursePatch = async (server, options) => {
  const { apiConfig: { method, path, url: urlTemplate } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {}, payload: { course } } = request;
    console.log('message from boris', course);
    try {
      const url = parseUrlFromTemplate(urlTemplate, { courseId });
      const { data } = await axios({ method, url, data: course });
      return h.response(data).code(200);
    } catch (e) {
      serverConsoleError('coursePatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePatchPlugin = { name: 'coursePatchPlugin', register: registerCoursePatch };
