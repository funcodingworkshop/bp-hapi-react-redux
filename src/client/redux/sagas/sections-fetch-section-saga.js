import { put, takeEvery, call } from 'redux-saga/effects';
import { SECTIONS_TYPES, fetchSectionSuccessAC } from '../actions/sections-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* fetchSection(action) {
  const {
    payload: {
      id: sectionId
    }
  } = action;
  const { method, path: urlTemplate } = SERVICES.section;
  const url = parseUrlFromTemplate(urlTemplate, { sectionId });
  try {
    const { data: sectionData } = yield call(axios, { method, url });
    yield put(fetchSectionSuccessAC(sectionData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchFetchSection() {
  yield takeEvery(SECTIONS_TYPES.FETCH_SECTION_SAGA, fetchSection);
}
