import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/api/courses-api';

import {
  sectionsPlugin,
  sectionPostPlugin,
  sectionPlugin,
  sectionPatchPlugin,
  sectionDeletePlugin
} from './plugins/api/sections-api';

import { signInPlugin, signUpPlugin, signOutPlugin } from './plugins/api/auth-api';
import { fetchAccountPlugin } from './plugins/api/account-api';

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
      plugin: signInPlugin,
      options: { apiConfig: config.services.auth.signIn }
    },
    {
      plugin: signUpPlugin,
      options: { apiConfig: config.services.auth.signUp }
    },
    {
      plugin: signOutPlugin,
      options: { apiConfig: config.services.auth.signOut }
    },
    {
      plugin: fetchAccountPlugin,
      options: { apiConfig: config.services.account }
    },
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
    },
    {
      plugin: sectionsPlugin,
      options: { apiConfig: config.services.sections }
    },
    {
      plugin: sectionPostPlugin,
      options: { apiConfig: config.services.sectionPost }
    },
    {
      plugin: sectionPlugin,
      options: { apiConfig: config.services.section }
    },
    {
      plugin: sectionPatchPlugin,
      options: { apiConfig: config.services.sectionPatch }
    },
    {
      plugin: sectionDeletePlugin,
      options: { apiConfig: config.services.sectionDelete }
    }
  ];
};

export default getPlugins;
