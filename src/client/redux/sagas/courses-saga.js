import { put, takeEvery, select, call } from 'redux-saga/effects';
import { COURSES_TYPES, fetchCoursesSuccessAC } from '../actions/courses-actions';
import { selectCourses } from '../selectors/courses-selectors';
import axios from '../../axios-instance-browser';

// worker Saga: will be fired on FETCH_COURSES_SAGA actions
function* fetchCourses() {
  const currentCourses = yield select(selectCourses);
  if (currentCourses.length === 0) {
    // TODO obtain method and url from settings
    const method = 'GET';
    const url = '/api/courses';
    try {
      const res = yield call(axios, { method, url });
      const coursesData = res.data;
      yield put(fetchCoursesSuccessAC(coursesData));
    } catch (error) {
      // TODO add FAILURE ACTIONS
      console.log(error, 'error');
    }
  }
}

// Starts fetchCourses on each dispatched `FETCH_COURSES_SAGA` action.
// eslint-disable-next-line
export function* watchFetchCourses() {
  yield takeEvery(COURSES_TYPES.FETCH_COURSES_SAGA, fetchCourses);
}
