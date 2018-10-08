// ACTION TYPES
export const SECTIONS_TYPES = {
  // FETCH SECTIONS LIST
  FETCH_SECTIONS_SAGA: 'FETCH_SECTIONS_SAGA',
  FETCH_SECTIONS_SUCCESS: 'FETCH_SECTIONS_SUCCESS',

  // CREATE ITEM
  CREATE_SECTION_SAGA: 'CREATE_SECTION_SAGA',
  CREATE_SECTION_SUCCESS: 'CREATE_SECTION_SUCCESS',

  // FETCH ITEM
  FETCH_SECTION_SAGA: 'FETCH_SECTION_SAGA',
  FETCH_SECTION_SUCCESS: 'FETCH_SECTION_SUCCESS',

  // UPDATE ITEM
  UPDATE_SECTION_SAGA: 'UPDATE_SECTION_SAGA',
  UPDATE_SECTION_SUCCESS: 'UPDATE_SECTION_SUCCESS',

  // DELETE ITEM
  DELETE_SECTION_SAGA: 'DELETE_SECTION_SAGA',
  DELETE_SECTION_SUCCESS: 'DELETE_SECTION_SUCCESS'
};

// ACTION CREATORS
// Postfix AC stands for Action Creator
// FETCH SECTIONS
export function fetchSectionsSagaAC() {
  return {
    type: SECTIONS_TYPES.FETCH_SECTIONS_SAGA
  };
}

export function fetchSectionsSuccessAC(sections) {
  return {
    type: SECTIONS_TYPES.FETCH_SECTIONS_SUCCESS,
    payload: {
      sections
    }
  };
}

// FETCH SECTION
export function fetchSectionSagaAC(id) {
  return {
    type: SECTIONS_TYPES.FETCH_SECTION_SAGA,
    payload: {
      id
    }
  };
}

export function fetchSectionSuccessAC(section) {
  return {
    type: SECTIONS_TYPES.FETCH_SECTION_SUCCESS,
    payload: {
      section
    }
  };
}

// CREATE SECTION
export function createSectionAC(data) {
  return {
    type: SECTIONS_TYPES.CREATE_SECTION_SAGA,
    payload: {
      name: data.name,
      code: data.code,
      comment: data.comment
    }
  };
}

export function createSectionSuccessAC(section) {
  return {
    type: SECTIONS_TYPES.CREATE_SECTION_SUCCESS,
    payload: section
  };
}

// DELETE SECTION
export function deleteSectionAC(id) {
  return {
    type: SECTIONS_TYPES.DELETE_SECTION_SAGA,
    payload: id
  };
}

export function deleteSectionSuccessAC(id) {
  return {
    type: SECTIONS_TYPES.DELETE_SECTION_SUCCESS,
    payload: id
  };
}

// UPDATE SECTION
export function updateSectionAC(id, section) {
  return {
    type: SECTIONS_TYPES.UPDATE_SECTION_SAGA,
    payload: { id, section }
  };
}

export function updateSectionSuccessAC(section) {
  return {
    type: SECTIONS_TYPES.UPDATE_SECTION_SUCCESS,
    payload: section
  };
}
