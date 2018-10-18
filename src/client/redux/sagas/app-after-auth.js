import { put } from '../../../../node_modules/redux-saga/effects';
import { doRouteAC } from '../actions/router-actions';
import { PAGES } from '../../routes/pages';
import { fetchAccountSagaAC } from '../actions/app-actions';

export function* afterAuth() {
  yield put(fetchAccountSagaAC());
  yield put(doRouteAC(PAGES.home.path));
}
