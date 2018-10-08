import { put, takeEvery, select, call } from 'redux-saga/effects';
import { SECTIONS_TYPES, fetchSectionsSuccessAC } from '../actions/sections-actions';
import { SERVICES } from '../../../server/config/services';
import { selectSections } from '../selectors/sections-selectors';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';

// worker Saga: will be fired on FETCH_SECTIONS_SAGA actions
function* fetchSections() {
  const currentSections = yield select(selectSections);
  if (currentSections.length === 0) {
    const { method, path: url } = SERVICES.sections;
    try {
      const res = yield call(axios, { method, url });
      const sectionsData = res.data;
      yield put(fetchSectionsSuccessAC(sectionsData));
    } catch (error) {
      yield* apiError(error);
    }
  }
}

// Starts fetchSections on each dispatched `FETCH_SECTIONS_SAGA` action.
export function* watchFetchSections() {
  yield takeEvery(SECTIONS_TYPES.FETCH_SECTIONS_SAGA, fetchSections);
}
