import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, fetchAccountSuccessAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';
import { apiError } from './api-error';

function* fetchAccount() {
  const { method, path: url } = SERVICES.account;
  try {
    const { data: userData } = yield call(axios, { method, url });
    yield put(fetchAccountSuccessAC(userData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchFetchAccount() {
  yield takeEvery(APP_TYPES.FETCH_ACCOUNT_SAGA, fetchAccount);
}
