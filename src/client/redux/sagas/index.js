import { all } from 'redux-saga/effects';
import { watchTestButton } from './app-saga';
import { watchFetchCourses } from './courses-fetch-courses-saga';
import { watchFetchCourse } from './courses-fetch-course-saga';
import { watchAddCourse } from './courses-add-course-saga';
import { watchDeleteCourse } from './courses-delete-course-saga';
import { watchUpdateCourse } from './courses-update-course-saga';
import { watchFetchSections } from './sections-fetch-sections-saga';
import { watchFetchSection } from './sections-fetch-section-saga';
import { watchAddSection } from './sections-add-section-saga';
import { watchDeleteSection } from './sections-delete-section-saga';
import { watchUpdateSection } from './sections-update-section-saga';
import { watchSignUp } from './app-sign-up-saga';
import { watchSignIn } from './app-sign-in-saga';
import { watchFetchAccount } from './app-fetch-account-saga';
import { watchSignOut } from './app-sign-out-saga';

export default function* rootSaga() {
  yield all([
    watchTestButton(),
    watchFetchCourses(),
    watchFetchCourse(),
    watchAddCourse(),
    watchDeleteCourse(),
    watchUpdateCourse(),
    watchFetchSections(),
    watchFetchSection(),
    watchAddSection(),
    watchDeleteSection(),
    watchUpdateSection(),
    watchSignUp(),
    watchSignIn(),
    watchFetchAccount(),
    watchSignOut()
  ]);
}
