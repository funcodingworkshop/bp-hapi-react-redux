import { put } from 'redux-saga/effects';
import { doRouteAC } from '../actions/router-actions';
import { PAGES } from '../../routes/pages';

export function* apiError(error) {
  // eslint-disable-next-line
  console.error(error);
  const { response: { status } = {} } = error;
  if (status && status === 401) {
    yield put(doRouteAC(PAGES.signIn.path));
  }
}
