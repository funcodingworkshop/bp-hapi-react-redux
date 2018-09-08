// ACTION TYPES
export const LESSONS_TYPES = {
  // FETCH LESSONS LIST
  FETCH_LESSONS_SAGA: 'FETCH_LESSONS_SAGA',
  FETCH_LESSONS_START: 'FETCH_LESSONS_START',
  FETCH_LESSONS_SUCCESS: 'FETCH_LESSONS_SUCCESS',
  FETCH_LESSONS_ERROR: 'FETCH_LESSONS_ERROR',

  // CREATE ITEM
  CREATE_LESSON_SAGA: 'CREATE_LESSON_SAGA',
  CREATE_LESSON_START: 'CREATE_LESSON_START',
  CREATE_LESSON_SUCCESS: 'CREATE_LESSON_SUCCESS',
  CREATE_LESSON_ERROR: 'CREATE_LESSON_ERROR',

  // FETCH ITEM
  FETCH_LESSON_SAGA: 'FETCH_LESSON_SAGA',
  FETCH_LESSON_START: 'FETCH_LESSON_START',
  FETCH_LESSON_SUCCESS: 'FETCH_LESSON_SUCCESS',
  FETCH_LESSON_ERROR: 'FETCH_LESSON_ERROR',

  // UPDATE ITEM
  UPDATE_LESSON_SAGA: 'UPDATE_LESSON_SAGA',
  UPDATE_LESSON_START: 'UPDATE_LESSON_START',
  UPDATE_LESSON_SUCCESS: 'UPDATE_LESSON_SUCCESS',
  UPDATE_LESSON_ERROR: 'UPDATE_LESSON_ERROR',

  // DELETE ITEM
  DELETE_LESSON_SAGA: 'DELETE_LESSON_SAGA',
  DELETE_LESSON_START: 'DELETE_LESSON_START',
  DELETE_LESSON_SUCCESS: 'DELETE_LESSON_SUCCESS',
  DELETE_LESSON_ERROR: 'DELETE_LESSON_ERROR'
};

// ACTION CREATORS
// Postfix AC stands for Action Creator
export function fetchLessonsSagaAC() {
  return {
    type: LESSONS_TYPES.FETCH_LESSONS_SAGA
  };
}

export function fetchLessonsSuccessAC(lessons) {
  return {
    type: LESSONS_TYPES.FETCH_LESSONS_SUCCESS,
    payload: {
      lessons
    }
  };
}

export function fetchLessonSagaAC(id) {
  return {
    type: LESSONS_TYPES.FETCH_LESSON_SAGA,
    payload: {
      id
    }
  };
}

export function fetchLessonSuccessAC(lesson) {
  return {
    type: LESSONS_TYPES.FETCH_LESSON_SUCCESS,
    payload: {
      lesson
    }
  };
}

export function createLessonAC(data) {
  return {
    type: LESSONS_TYPES.CREATE_LESSON_SAGA,
    payload: {
      name: data.name,
      code: data.code,
      comment: data.comment
    }
  };
}

export function createLessonSuccessAC(lesson) {
  return {
    type: LESSONS_TYPES.CREATE_LESSON_SUCCESS,
    payload: lesson
  };
}

export function deleteLessonAC(id) {
  return {
    type: LESSONS_TYPES.DELETE_LESSON_SAGA,
    payload: id
  };
}

export function deleteLessonSuccessAC(id) {
  return {
    type: LESSONS_TYPES.DELETE_LESSON_SUCCESS,
    payload: id
  };
}

export function updateLessonAC(id, lesson) {
  return {
    type: LESSONS_TYPES.UPDATE_LESSON_SAGA,
    payload: { id, lesson }
  };
}

export function updateLessonSuccessAC(lesson) {
  return {
    type: LESSONS_TYPES.UPDATE_LESSON_SUCCESS,
    payload: lesson
  };
}

