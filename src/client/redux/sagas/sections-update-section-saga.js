import { put, takeEvery, call } from 'redux-saga/effects';
import { SECTIONS_TYPES, updateSectionSuccessAC } from '../actions/sections-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* updateSection(action) {
  const {
    payload: {
      id: sectionId
    }
  } = action;
  const { method, path: urlTemplate } = SERVICES.sectionPatch;
  const url = parseUrlFromTemplate(urlTemplate, { sectionId });
  try {
    const { data: updatedSectionData } = yield call(axios, { method, url, data: action.payload });
    yield put(updateSectionSuccessAC(updatedSectionData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchUpdateSection() {
  yield takeEvery(SECTIONS_TYPES.UPDATE_SECTION_SAGA, updateSection);
}
