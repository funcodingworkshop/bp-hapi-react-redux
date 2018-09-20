import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, signInSuccessAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';
import { consoleError } from '../../utils/console-error';

function* signIn(action) {
  const {
    payload: {
      user
    }
  } = action;
  const { method, path: url } = SERVICES.auth.signIn;
  try {
    const { data: userData } = yield call(axios, { method, url, data: user });
    yield put(signInSuccessAC(userData));
  } catch (error) {
    consoleError(error);
  }
}

export function* watchSignIn() {
  yield takeEvery(APP_TYPES.SIGN_IN_SAGA, signIn);
}
