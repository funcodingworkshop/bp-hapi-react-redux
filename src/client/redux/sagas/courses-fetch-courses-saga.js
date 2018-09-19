import { put, takeEvery, select, call } from 'redux-saga/effects';
import { COURSES_TYPES, fetchCoursesSuccessAC } from '../actions/courses-actions';
import { SERVICES } from '../../../server/config/services';
import { selectCourses } from '../selectors/courses-selectors';
import axios from '../../axios-instance-browser';
import { consoleError } from '../../utils/console-error';

// worker Saga: will be fired on FETCH_COURSES_SAGA actions
function* fetchCourses() {
  const currentCourses = yield select(selectCourses);
  if (currentCourses.length === 0) {
    const { method, path: url } = SERVICES.courses;
    try {
      const res = yield call(axios, { method, url });
      const coursesData = res.data;
      yield put(fetchCoursesSuccessAC(coursesData));
    } catch (error) {
      consoleError(error);
    }
  }
}

// Starts fetchCourses on each dispatched `FETCH_COURSES_SAGA` action.
export function* watchFetchCourses() {
  yield takeEvery(COURSES_TYPES.FETCH_COURSES_SAGA, fetchCourses);
}
