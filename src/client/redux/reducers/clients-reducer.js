import { CLIENTS_TYPES } from '../actions/clients-actions';

const initialState = {
  list: [],
  current: {}
};

export default function clientsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CLIENTS_TYPES.FETCH_CLIENTS_SUCCESS: {
      return {
        ...state,
        list: payload.clients
      };
    }
    case CLIENTS_TYPES.FETCH_CLIENTS_SUCCESS: {
      return {
        ...state,
        current: payload.clients
      };
    }
    default:
      return state;
  }
}
