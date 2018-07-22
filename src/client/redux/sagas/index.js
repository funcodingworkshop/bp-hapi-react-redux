import { all } from 'redux-saga/effects';
import { watchTestButton } from './app-saga';
import { watchFetchCourses } from './courses-saga';

export default function* rootSaga() {
  yield all([
    watchTestButton(),
    watchFetchCourses()
  ]);
}
