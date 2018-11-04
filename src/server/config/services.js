export function getServicesConfig(serviceHost = 'localhost', mongoDbName = 'testDb') {
  return {
    indexPage: {
      method: 'GET',
      path: ''
    },
    courses: {
      method: 'GET',
      path: '/api/courses',
      url: `http://${serviceHost}/api/courses`
    },
    course: {
      method: 'GET',
      path: '/api/courses/{courseId}',
      url: `http://${serviceHost}/api/courses/{courseId}`
    },
    coursePost: {
      method: 'POST',
      path: '/api/courses',
      url: `http://${serviceHost}/api/courses`
    },
    courseDelete: {
      method: 'DELETE',
      path: '/api/courses/{courseId}',
      url: `http://${serviceHost}/api/courses/{courseId}`
    },
    coursePatch: {
      method: 'PATCH',
      path: '/api/courses/{courseId}/edit',
      url: `http://${serviceHost}/api/courses/{courseId}`
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
    },
    elasticsearch: {
      method: 'POST',
      path: '/api/search',
      url: 'http://localhost:9200/bp_auth_otp/_search'
    }
  };
}

export const SERVICES = getServicesConfig();
