import { put, takeEvery, call } from 'redux-saga/effects';
import { SECTIONS_TYPES, createSectionSuccessAC } from '../actions/sections-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';

function* addSection(action) {
  const {
    payload: sectionData
  } = action;
  const { method, path: url } = SERVICES.sectionPost;
  try {
    const { data: savedsectionData } = yield call(axios, { method, url, data: sectionData });
    yield put(createSectionSuccessAC(savedsectionData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchAddSection() {
  yield takeEvery(SECTIONS_TYPES.CREATE_SECTION_SAGA, addSection);
}
