import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, signUpSuccessAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';
import { apiError } from './api-error';
import { afterAuth } from './app-auth';

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
    yield* afterAuth();
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchSignUp() {
  yield takeEvery(APP_TYPES.SIGN_UP_SAGA, signUp);
}
