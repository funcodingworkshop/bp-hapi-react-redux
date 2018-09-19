import { APP_TYPES } from '../actions/app-actions';

const initialState = {
  say: 'nothing to say yet ... meaw...',
  user: {}
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case APP_TYPES.SAY_HI: {
      return { ...state, say: 'hi' };
    }
    case APP_TYPES.SAY_BYE: {
      return { ...state, say: 'bye' };
    }
    case APP_TYPES.SIGN_UP_SUCCESS: {
      return {
        ...state,
        user: payload.user
      };
    }
    default:
      return state;
  }
}
