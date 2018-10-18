import { APP_TYPES } from '../actions/app-actions';

const initialState = {
  say: 'nothing to say yet ... meaw...',
  account: undefined,
  isAccountLoading: false
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case APP_TYPES.SAY_HI: {
      return { ...state, say: 'hi' };
    }
    case APP_TYPES.SAY_BYE: {
      return { ...state, say: 'bye' };
    }
    case APP_TYPES.FETCH_ACCOUNT_START: {
      return {
        ...state, isAccountLoading: true
      };
    }
    case APP_TYPES.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: payload.account,
        isAccountLoading: false
      };
    }
    case APP_TYPES.FETCH_ACCOUNT_ERROR: {
      return {
        ...state, isAccountLoading: false
      };
    }
    case APP_TYPES.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        account: undefined
      };
    }
    default:
      return state;
  }
}
