export function getServicesConfig(serviceHost = 'localhost') {
  return {
    indexPage: {
      method: 'GET',
      path: ''
    },
    courses: {
      method: 'GET',
      path: '/api/courses'
    },
    coursePost: {
      method: 'POST',
      path: '/api/courses'
    },
    course: {
      method: 'GET',
      path: '/api/courses/{courseId}'
    },
    coursePatch: {
      method: 'PATCH',
      path: '/api/courses/{courseId}/edit'
    },
    courseDelete: {
      method: 'DELETE',
      path: '/api/courses/{courseId}'
    },
    sections: {
      method: 'GET',
      path: '/api/sections'
    },
    sectionPost: {
      method: 'POST',
      path: '/api/sections'
    },
    section: {
      method: 'GET',
      path: '/api/sections/{sectionId}'
    },
    sectionPatch: {
      method: 'PATCH',
      path: '/api/sections/{sectionId}/edit'
    },
    sectionDelete: {
      method: 'DELETE',
      path: '/api/sections/{sectionId}'
    },
    auth: {
      verifyJwt: {
        method: 'POST',
        url: `http://${serviceHost}/api/verify-jwt`
      },
      signUp: {
        method: 'POST',
        path: '/api/sign-up',
        url: `http://${serviceHost}/api/sign-up-pass`
      },
      signIn: {
        method: 'POST',
        path: '/api/sign-in',
        url: `http://${serviceHost}/api/sign-in-pass`
      },
      signOut: {
        method: 'POST',
        path: '/api/sign-out'
      }
    },
    account: {
      method: 'GET',
      path: '/api/account',
      methodUrl: 'POST',
      url: `http://${serviceHost}/api/verify-jwt`
    }
  };
}

export const SERVICES = getServicesConfig();
