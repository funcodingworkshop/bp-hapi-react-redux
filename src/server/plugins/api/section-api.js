import mongoose from 'mongoose';
import { HTTP_ERROR_400, createError } from '../../constants';
import { serverConsoleError } from '../../utils/server-console-error';

const sectionSchema = mongoose.Schema({
  name: String,
  duration: String,
  course: [
    { type: mongoose.Schema.ObjectId, ref: 'Course' }
  ]
});
sectionSchema.set('timestamps', true);
const Section = mongoose.model('Section', sectionSchema);


// courses index
const registerSections = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = () => {
    try {
      return Section.find();
    } catch (e) {
      serverConsoleError('sectionPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const sectionPlugin = { name: 'sectionPlugin', register: registerSections };

// create section
const registerCoursePost = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    try {
      const section = new Section(request.payload);
      const res = await section.save();
      return h.response(res).code(201);
    } catch (e) {
      serverConsoleError('coursePostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const coursePostPlugin = { name: 'coursePostPlugin', register: registerCoursePost };

// read section
const registerCourse = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const courses = await Section.find({ _id: courseId });
      if (courses.length === 1) {
        return h.response(courses[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('coursePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePlugin = { name: 'coursePlugin', register: registerCourse };

// update section
const registerCoursePatch = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {}, payload: { section } } = request;
    try {
      const courses = await Section.find({ _id: courseId });
      if (courses.length === 1) {
        await courses[0].updateOne({ ...section, $inc: { __v: 1 } });
        const res = await Section.find({ _id: courseId });
        return h.response(res).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('coursePatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const coursePatchPlugin = { name: 'coursePatchPlugin', register: registerCoursePatch };

// delete section
const registerCourseDelete = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const courses = await Section.find({ _id: courseId });
      if (courses.length > 0) {
        await Section.find({ _id: courseId }).deleteOne();
        return h.response().code(204);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('courseDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const courseDeletePlugin = { name: 'courseDeletePlugin', register: registerCourseDelete };
