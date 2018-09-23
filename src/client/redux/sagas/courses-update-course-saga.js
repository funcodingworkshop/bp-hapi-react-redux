import { put, takeEvery, call } from 'redux-saga/effects';
import { COURSES_TYPES, updateCourseSuccessAC } from '../actions/courses-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* updateCourse(action) {
  const {
    payload: {
      id: courseId
    }
  } = action;
  const { method, path: urlTemplate } = SERVICES.coursePatch;
  const url = parseUrlFromTemplate(urlTemplate, { courseId });
  try {
    const { data: updatedCourseData } = yield call(axios, { method, url, data: action.payload });
    yield put(updateCourseSuccessAC(updatedCourseData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchUpdateCourse() {
  yield takeEvery(COURSES_TYPES.UPDATE_COURSE_SAGA, updateCourse);
}
