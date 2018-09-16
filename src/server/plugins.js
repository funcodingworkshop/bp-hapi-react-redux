import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/api/courses-api';

const getPlugins = (config) => {
  // eslint-disable-next-line no-unused-vars
  const loggerConfig = {
    appId: config.appId,
    devtools: config.devtools,
    server: config.server,
    logger: config.logger
  };

  return [
    {
      plugin: coursesPlugin,
      options: { apiConfig: config.services.courses }
    },
    {
      plugin: coursePostPlugin,
      options: { apiConfig: config.services.coursePost }
    },
    {
      plugin: coursePlugin,
      options: { apiConfig: config.services.course }
    },
    {
      plugin: coursePatchPlugin,
      options: { apiConfig: config.services.coursePatch }
    },
    {
      plugin: courseDeletePlugin,
      options: { apiConfig: config.services.courseDelete }
    }
  ];
};

export default getPlugins;
