// ACTION TYPES
export const CLIENTS_TYPES = {
  FETCH_CLIENTS_SAGA: 'FETCH_CLIENTS_SAGA',
  FETCH_CLIENTS_SUCCESS: 'FETCH_CLIENTS_SUCCESS'
};

// ACTION CREATORS
// Postfix AC stands for Action Creator
// FETCH CLIENTS
export function fetchClientsSagaAC() {
  return {
    type: CLIENTS_TYPES.FETCH_CLIENTS_SAGA
  };
}

export function fetchClientsSuccessAC(clients) {
  return {
    type: CLIENTS_TYPES.FETCH_CLIENTS_SUCCESS,
    payload: {
      clients
    }
  };
}
