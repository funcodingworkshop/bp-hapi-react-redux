import { APP_TYPES } from '../actions/app-actions';

const initialState = {
  say: 'nothing to say yet ... meaw...'
};

export default function appReducer(state = initialState, { type }) {
  switch (type) {
    case APP_TYPES.SAY_HI: {
      return { ...state, say: 'hi' };
    }
    case APP_TYPES.SAY_BYE: {
      return { ...state, say: 'bye' };
    }
    default:
      return state;
  }
}
