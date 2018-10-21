import { all } from 'redux-saga/effects';
import { watchTestButton } from './app-saga';
import { watchFetchCourses } from './courses-fetch-courses-saga';
import { watchFetchCourse } from './courses-fetch-course-saga';
import { watchAddCourse } from './courses-add-course-saga';
import { watchDeleteCourse } from './courses-delete-course-saga';
import { watchUpdateCourse } from './courses-update-course-saga';
import { watchSignUp } from './app-sign-up-saga';
import { watchSignIn } from './app-sign-in-saga';
import { watchFetchAccount } from './app-fetch-account-saga';
import { watchSignOut } from './app-sign-out-saga';
import {
  watchEnqueueErrorNotification,
  watchEnqueueInfoNotification,
  watchEnqueueSuccessNotification,
  watchEnqueueWarningNotification
} from './app-notifications-saga';

export default function* rootSaga() {
  yield all([
    watchTestButton(),
    watchFetchCourses(),
    watchFetchCourse(),
    watchAddCourse(),
    watchDeleteCourse(),
    watchUpdateCourse(),
    watchSignUp(),
    watchSignIn(),
    watchFetchAccount(),
    watchSignOut(),
    watchEnqueueErrorNotification(),
    watchEnqueueInfoNotification(),
    watchEnqueueSuccessNotification(),
    watchEnqueueWarningNotification()
  ]);
}
