import { CLIENTS_TYPES } from '../actions/clients-actions';

const initialState = {
  list: []
};

export default function getClients(state = initialState, { type, payload }) {
  switch (type) {
    case CLIENTS_TYPES.FETCH_CLIENTS_SUCCESS: {
      return {
        ...state,
        list: payload.clients
      };
    }
    default:
      return state;
  }
}
