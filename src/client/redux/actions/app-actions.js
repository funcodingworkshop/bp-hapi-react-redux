// TODO delete test actions

export const APP_TYPES = {
  SAY_HI: 'SAY_HI',
  SAY_BYE: 'SAY_BYE',
  TEST_BUTTON: 'TEST_BUTTON',
  TEST_BUTTON_SUCCESS: 'TEST_BUTTON_SUCCESS',
  TEST_BUTTON_ERROR: 'TEST_BUTTON_ERROR',

  SIGN_UP_SAGA: 'SIGN_UP_SAGA',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS'
};

// ACTION CREATORS
export function sayHiAC() {
  return {
    type: APP_TYPES.SAY_HI
  };
}

export function sayByeAC() {
  return {
    type: APP_TYPES.SAY_BYE
  };
}

export function testButtonAC() {
  return {
    type: APP_TYPES.TEST_BUTTON
  };
}

export function testButtonSuccessAC(courses) {
  return {
    type: APP_TYPES.TEST_BUTTON_SUCCESS,
    payload: {
      courses
    }
  };
}

// SIGN UP
export function signUpSagaAC(user) {
  return {
    type: APP_TYPES.SIGN_UP_SAGA,
    payload: {
      user
    }
  };
}

export function signUpSuccessAC(user) {
  return {
    type: APP_TYPES.SIGN_UP_SUCCESS,
    payload: {
      user
    }
  };
}
