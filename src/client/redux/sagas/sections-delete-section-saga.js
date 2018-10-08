import { put, takeEvery, call } from 'redux-saga/effects';
import { SECTIONS_TYPES, deleteSectionSuccessAC } from '../actions/sections-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* deleteSection(action) {
  const {
    payload: sectionId
  } = action;
  const { method, path: urlTemplate } = SERVICES.sectionDelete;
  const url = parseUrlFromTemplate(urlTemplate, { sectionId });
  try {
    yield call(axios, { method, url });
    yield put(deleteSectionSuccessAC(sectionId));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchDeleteSection() {
  yield takeEvery(SECTIONS_TYPES.DELETE_SECTION_SAGA, deleteSection);
}
