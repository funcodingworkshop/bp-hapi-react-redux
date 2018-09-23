import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, signOutSuccessAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';
import { apiError } from './api-error';
import { doRouteAC } from '../actions/router-actions';
import { PAGES } from '../../routes/pages';

function* signOut() {
  const { method, path: url } = SERVICES.auth.signOut;
  try {
    const { data: userData } = yield call(axios, { method, url });
    yield put(signOutSuccessAC(userData));
    yield put(doRouteAC(PAGES.signIn.path));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchSignOut() {
  yield takeEvery(APP_TYPES.SIGN_OUT_SAGA, signOut);
}
