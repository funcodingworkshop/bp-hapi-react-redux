import { all } from 'redux-saga/effects';
import { watchTestButton } from './app-saga';
import { watchFetchCourses, watchFetchCourse, watchAddCourse, watchDeleteCourse, watchUpdateCourse } from './courses-saga';

export default function* rootSaga() {
  yield all([
    watchTestButton(),
    watchFetchCourses(),
    watchFetchCourse(),
    watchAddCourse(),
    watchDeleteCourse(),
    watchUpdateCourse()
  ]);
}
