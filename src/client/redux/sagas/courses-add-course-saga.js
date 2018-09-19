import { put, takeEvery, call } from 'redux-saga/effects';
import { COURSES_TYPES, createCourseSuccessAC } from '../actions/courses-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { consoleError } from '../../utils/console-error';

function* addCourse(action) {
  const {
    payload: courseData
  } = action;
  const { method, path: url } = SERVICES.coursePost;
  try {
    const { data: savedCourseData } = yield call(axios, { method, url, data: courseData });
    yield put(createCourseSuccessAC(savedCourseData));
  } catch (error) {
    consoleError(error);
  }
}

export function* watchAddCourse() {
  yield takeEvery(COURSES_TYPES.CREATE_COURSE_SAGA, addCourse);
}
