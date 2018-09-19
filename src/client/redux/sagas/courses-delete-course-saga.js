import { put, takeEvery, call } from 'redux-saga/effects';
import { COURSES_TYPES, deleteCourseSuccessAC } from '../actions/courses-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { consoleError } from '../../utils/console-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* deleteCourse(action) {
  const {
    payload: courseId
  } = action;
  const { method, path: urlTemplate } = SERVICES.courseDelete;
  const url = parseUrlFromTemplate(urlTemplate, { courseId });
  try {
    yield call(axios, { method, url });
    yield put(deleteCourseSuccessAC(courseId));
  } catch (error) {
    consoleError(error);
  }
}

export function* watchDeleteCourse() {
  yield takeEvery(COURSES_TYPES.DELETE_COURSE_SAGA, deleteCourse);
}
