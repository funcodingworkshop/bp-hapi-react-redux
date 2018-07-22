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
    default:
      return state;
  }
}
