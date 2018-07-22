import { put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { APP_TYPES, testButtonSuccessAC } from '../actions/app-actions';

function* testButton() {
  try {
    yield delay(1000);
    yield put(testButtonSuccessAC([{ name: 'first' }, { name: 'second' }]));
  } catch (e) {
    yield put({ type: APP_TYPES.TEST_BUTTON_ERROR, message: 'error' });
  }
}

// TODO remove this test saga
// eslint-disable-next-line
export function* watchTestButton() {
  yield takeEvery(APP_TYPES.TEST_BUTTON, testButton);
}
