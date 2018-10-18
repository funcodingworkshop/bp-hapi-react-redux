import { put, takeEvery, call } from 'redux-saga/effects';
import { APP_TYPES, fetchAccountStartAC, fetchAccountSuccessAC, fetchAccountErrorAC } from '../actions/app-actions';
import axios from '../../axios-instance-browser';
import { SERVICES } from '../../../server/config/services';

function* fetchAccount() {
  yield put(fetchAccountStartAC());
  const { method, path: url } = SERVICES.account;
  try {
    const { data: accountData } = yield call(axios, { method, url });
    yield put(fetchAccountSuccessAC(accountData));
  } catch (error) {
    yield put(fetchAccountErrorAC());
    // eslint-disable-next-line
    console.error(error);
  }
}

export function* watchFetchAccount() {
  yield takeEvery(APP_TYPES.FETCH_ACCOUNT_SAGA, fetchAccount);
}
