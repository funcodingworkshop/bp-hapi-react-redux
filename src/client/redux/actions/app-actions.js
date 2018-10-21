import { NOTIFICATION_TYPES } from '../../constants/notification-types';

export const APP_TYPES = {
  // TODO delete test actions
  SAY_HI: 'SAY_HI',
  SAY_BYE: 'SAY_BYE',
  TEST_BUTTON: 'TEST_BUTTON',
  TEST_BUTTON_SUCCESS: 'TEST_BUTTON_SUCCESS',
  TEST_BUTTON_ERROR: 'TEST_BUTTON_ERROR',

  SIGN_UP_SAGA: 'SIGN_UP_SAGA',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',

  SIGN_IN_SAGA: 'SIGN_IN_SAGA',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',

  FETCH_ACCOUNT_SAGA: 'FETCH_ACCOUNT_SAGA',
  FETCH_ACCOUNT_START: 'FETCH_ACCOUNT_START',
  FETCH_ACCOUNT_SUCCESS: 'FETCH_ACCOUNT_SUCCESS',
  FETCH_ACCOUNT_ERROR: 'FETCH_ACCOUNT_ERROR',

  SIGN_OUT_SAGA: 'SIGN_OUT_SAGA',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',

  ENQUEUE_SUCCESS_NOTIFICATION_SAGA: 'ENQUEUE_SUCCESS_NOTIFICATION_SAGA',
  ENQUEUE_WARNING_NOTIFICATION_SAGA: 'ENQUEUE_WARNING_NOTIFICATION_SAGA',
  ENQUEUE_ERROR_NOTIFICATION_SAGA: 'ENQUEUE_ERROR_NOTIFICATION_SAGA',
  ENQUEUE_INFO_NOTIFICATION_SAGA: 'ENQUEUE_INFO_NOTIFICATION_SAGA',
  ENQUEUE_NOTIFICATION: 'ENQUEUE_NOTIFICATION',
  PROCESS_NOTIFICATION: 'PROCESS_NOTIFICATION',
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION'
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

// SIGN IN
export function signInSagaAC(user) {
  return {
    type: APP_TYPES.SIGN_IN_SAGA,
    payload: {
      user
    }
  };
}

export function signInSuccessAC(user) {
  return {
    type: APP_TYPES.SIGN_IN_SUCCESS,
    payload: {
      user
    }
  };
}

// SIGN OUT
export function signOutSagaAC() {
  return {
    type: APP_TYPES.SIGN_OUT_SAGA
  };
}

export function signOutSuccessAC() {
  return {
    type: APP_TYPES.SIGN_OUT_SUCCESS
  };
}

// FETCH ACCOUNT
export function fetchAccountSagaAC() {
  return {
    type: APP_TYPES.FETCH_ACCOUNT_SAGA
  };
}

export function fetchAccountStartAC() {
  return {
    type: APP_TYPES.FETCH_ACCOUNT_START
  };
}

export function fetchAccountSuccessAC(account) {
  return {
    type: APP_TYPES.FETCH_ACCOUNT_SUCCESS,
    payload: {
      account
    }
  };
}

export function fetchAccountErrorAC() {
  return {
    type: APP_TYPES.FETCH_ACCOUNT_ERROR
  };
}

// NOTIFICATIONS
export function enqueueSuccessNotificationSagaAC(message) {
  return {
    type: APP_TYPES.ENQUEUE_SUCCESS_NOTIFICATION_SAGA,
    payload: {
      message,
      notificationType: NOTIFICATION_TYPES.success
    }
  };
}

export function enqueueErrorNotificationSagaAC(message) {
  return {
    type: APP_TYPES.ENQUEUE_ERROR_NOTIFICATION_SAGA,
    payload: {
      message,
      notificationType: NOTIFICATION_TYPES.error
    }
  };
}

export function enqueueWarningNotificationSagaAC(message) {
  return {
    type: APP_TYPES.ENQUEUE_WARNING_NOTIFICATION_SAGA,
    payload: {
      message,
      notificationType: NOTIFICATION_TYPES.warning
    }
  };
}

export function enqueueInfoNotificationSagaAC(message) {
  return {
    type: APP_TYPES.ENQUEUE_INFO_NOTIFICATION_SAGA,
    payload: {
      message,
      notificationType: NOTIFICATION_TYPES.info
    }
  };
}

export function enqueueNotificationAC(message, notificationType) {
  return {
    type: APP_TYPES.ENQUEUE_NOTIFICATION,
    payload: {
      message,
      notificationType,
      key: new Date().getTime()
    }
  };
}

export function processNotificationAC() {
  return {
    type: APP_TYPES.PROCESS_NOTIFICATION
  };
}

export function closeNotificationAC() {
  return {
    type: APP_TYPES.CLOSE_NOTIFICATION
  };
}
