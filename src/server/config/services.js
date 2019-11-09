export function getServicesConfig(serviceHost = 'localhost') {
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
    clients: {
      method: 'GET',
      path: '/api/clients',
      url: `http://${serviceHost}/api/clients`
    },
    client: {
      method: 'GET',
      path: '/api/clients/{clientId}',
      url: `http://${serviceHost}/api/clients/{clientId}`
    },
    clientPost: {
      method: 'POST',
      path: '/api/clients',
      url: `http://${serviceHost}/api/clients`
    },
    clientDelete: {
      method: 'DELETE',
      path: '/api/clients/{clientId}',
      url: `http://${serviceHost}/api/clients/{clientId}`
    },
    clientPatch: {
      method: 'PATCH',
      path: '/api/clients/{clientId}/edit',
      url: `http://${serviceHost}/api/clients/{clientId}`
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
