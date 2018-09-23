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
      }
    },
    userInfo: {
      method: 'GET',
      path: '/api/user-info',
      url: `http://${serviceHost}/api/verify-jwt`
    }
  };
}

export const SERVICES = getServicesConfig();
