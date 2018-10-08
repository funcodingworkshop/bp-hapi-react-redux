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


// sections index
const registerSections = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = () => {
    try {
      return Section.find();
    } catch (e) {
      serverConsoleError('sectionsPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const sectionsPlugin = { name: 'sectionsPlugin', register: registerSections };

// create section
const registerCoursePost = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    try {
      const section = new Section(request.payload);
      const res = await section.save();
      return h.response(res).code(201);
    } catch (e) {
      serverConsoleError('sectionPostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const sectionPostPlugin = { name: 'sectionPostPlugin', register: registerCoursePost };

// read section
const registerSection = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const sections = await Section.find({ _id: courseId });
      if (sections.length === 1) {
        return h.response(sections[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('sectionPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const sectionPlugin = { name: 'sectionPlugin', register: registerSection };

// update section
const registerCoursePatch = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {}, payload: { section } } = request;
    try {
      const sections = await Section.find({ _id: courseId });
      if (sections.length === 1) {
        await sections[0].updateOne({ ...section, $inc: { __v: 1 } });
        const res = await Section.find({ _id: courseId });
        return h.response(res).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('sectionPatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const sectionPatchPlugin = { name: 'sectionPatchPlugin', register: registerCoursePatch };

// delete section
const registerCourseDelete = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { params: { courseId } = {} } = request;
    try {
      const sections = await Section.find({ _id: courseId });
      if (sections.length > 0) {
        await Section.find({ _id: courseId }).deleteOne();
        return h.response().code(204);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('sectionDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const sectionDeletePlugin = { name: 'sectionDeletePlugin', register: registerCourseDelete };
