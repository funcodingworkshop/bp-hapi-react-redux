import { COURSES_TYPES } from '../actions/courses-actions';

const initialState = {
  list: []
};

export default function coursesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case COURSES_TYPES.FETCH_COURSES_SUCCESS: {
      return {
        ...state,
        list: payload.courses
      };
    }
    case COURSES_TYPES.CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        list: state.list.concat(payload)
      }
    }
    case COURSES_TYPES.UPDATE_COURSE_SUCCESS: {
      return {
        ...state
      }
    }
    case COURSES_TYPES.DELETE_COURSE_SUCCESS: {
      let buffer = state.list;
      buffer = buffer.filter((course) => course._id !== payload)
      return {
        ...state,
        list: buffer
      }
    }
    default:
      return state;
  }
}
