import { put } from '../../../../node_modules/redux-saga/effects';
import { doRouteAC } from '../actions/router-actions';
import { PAGES } from '../../routes/pages';

export function* afterAuth() {
  yield put(doRouteAC(PAGES.home.path));
}
