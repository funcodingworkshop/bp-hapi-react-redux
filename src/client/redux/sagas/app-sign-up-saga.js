import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, signUpSuccessAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';
import { consoleError } from '../../utils/console-error';

function* signUp(action) {
  const {
    payload: {
      user
    }
  } = action;
  const { method, path: url } = SERVICES.auth.signUp;
  try {
    const { data: userData } = yield call(axios, { method, url, data: user });
    yield put(signUpSuccessAC(userData));
  } catch (error) {
    consoleError(error);
  }
}

export function* watchSignUp() {
  yield takeEvery(APP_TYPES.SIGN_UP_SAGA, signUp);
}
