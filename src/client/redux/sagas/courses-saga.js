import { put, takeEvery, select, call } from 'redux-saga/effects';
import { 
    COURSES_TYPES, 
    fetchCoursesSuccessAC, 
    createCourseSuccessAC
} from '../actions/courses-actions';

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


function* addCourse(action){
  const course_data = action.payload;
  console.log(course_data);
  const method = 'POST';
  const url = '/api/courses';
  try {
    const res = yield call(axios, { method, url, course_data } );
    yield put(createCourseSuccessAC(course_data));
  } catch (error) {
    console.log(error, 'error on add course post request');
  }

}

export function* watchAddCourse() {
  yield takeEvery(COURSES_TYPES.CREATE_COURSE_SAGA, addCourse);
}