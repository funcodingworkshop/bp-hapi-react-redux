import { put, takeEvery, select } from 'redux-saga/effects';
import { APP_TYPES, enqueueNotificationAC, closeNotificationAC, processNotificationAC } from '../actions/app-actions';
import { selectIsNotificationOpen } from '../selectors/app-selectors';
import { NOTIFICATION_TYPES } from '../../constants/notification-types';

export function* enqueueErrorNotification(response) {
  const { data: { message } = {} } = response;
  if (message) {
    const notificationType = NOTIFICATION_TYPES.error;
    yield put(enqueueNotificationAC(message, notificationType));
    const isNotificationOpen = yield select(selectIsNotificationOpen);
    if (isNotificationOpen) {
      yield put(closeNotificationAC());
    } else {
      yield put(processNotificationAC());
    }
  }
}

function* enqueueNotification(action) {
  const {
    payload: {
      message,
      notificationType
    }
  } = action;
  yield put(enqueueNotificationAC(message, notificationType));
  const isNotificationOpen = yield select(selectIsNotificationOpen);
  if (isNotificationOpen) {
    yield put(closeNotificationAC());
  } else {
    yield put(processNotificationAC());
  }
}

export function* watchEnqueueSuccessNotification() {
  yield takeEvery(APP_TYPES.ENQUEUE_SUCCESS_NOTIFICATION_SAGA, enqueueNotification);
}

export function* watchEnqueueErrorNotification() {
  yield takeEvery(APP_TYPES.ENQUEUE_ERROR_NOTIFICATION_SAGA, enqueueNotification);
}

export function* watchEnqueueWarningNotification() {
  yield takeEvery(APP_TYPES.ENQUEUE_WARNING_NOTIFICATION_SAGA, enqueueNotification);
}

export function* watchEnqueueInfoNotification() {
  yield takeEvery(APP_TYPES.ENQUEUE_INFO_NOTIFICATION_SAGA, enqueueNotification);
}
