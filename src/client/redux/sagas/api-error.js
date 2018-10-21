import { put } from 'redux-saga/effects';
import { doRouteAC } from '../actions/router-actions';
import { PAGES } from '../../routes/pages';
import { enqueueErrorNotification } from './app-notifications-saga';

export function* apiError(error) {
  yield* enqueueErrorNotification(error.response);
  // eslint-disable-next-line
  console.error(error);
  const { response: { status } = {} } = error;
  if (status && status === 401) {
    yield put(doRouteAC(PAGES.signIn.path));
  }
}
