export const SERVICES = {
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
    signUp: {
      method: 'POST',
      path: '/api/users'
    }
  }
};
