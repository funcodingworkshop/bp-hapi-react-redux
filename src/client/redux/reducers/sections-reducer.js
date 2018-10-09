import { SECTIONS_TYPES } from '../actions/sections-actions';

const initialState = {
  list: [],
  current: {}
};

export default function sectionsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SECTIONS_TYPES.FETCH_SECTIONS_SUCCESS: {
      return {
        ...state,
        list: payload.sections
      };
    }
    case SECTIONS_TYPES.FETCH_SECTION_SUCCESS: {
      return {
        ...state,
        current: payload.section
      };
    }
    case SECTIONS_TYPES.CREATE_SECTION_SUCCESS: {
      return {
        ...state,
        list: state.list.concat(payload)
      };
    }
    case SECTIONS_TYPES.UPDATE_SECTION_SUCCESS: {
      const buffer = state.list;
      buffer.forEach((section, index) => {
        if (section._id === payload[0]._id) { buffer.splice(index, 1, payload[0]); }
      });
      return {
        ...state,
        list: buffer
      };
    }
    case SECTIONS_TYPES.DELETE_SECTION_SUCCESS: {
      let buffer = state.list;
      buffer = buffer.filter(section => section._id !== payload);
      return {
        ...state,
        list: buffer
      };
    }
    default:
      return state;
  }
}
