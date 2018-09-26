import { put, takeEvery, call } from 'redux-saga/effects';
import { COURSES_TYPES, fetchCourseSuccessAC } from '../actions/courses-actions';
import { SERVICES } from '../../../server/config/services';
import axios from '../../axios-instance-browser';
import { apiError } from './api-error';
import { parseUrlFromTemplate } from '../../utils/path';

function* fetchCourse(action) {
  const {
    payload: {
      id: courseId
    }
  } = action;
  const { method, path: urlTemplate } = SERVICES.course;
  const url = parseUrlFromTemplate(urlTemplate, { courseId });
  try {
    const { data: courseData } = yield call(axios, { method, url });
    yield put(fetchCourseSuccessAC(courseData));
  } catch (error) {
    yield* apiError(error);
  }
}

export function* watchFetchCourse() {
  yield takeEvery(COURSES_TYPES.FETCH_COURSE_SAGA, fetchCourse);
}
