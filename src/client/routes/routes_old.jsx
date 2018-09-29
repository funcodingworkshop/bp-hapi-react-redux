import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import App from '../containers/app/app';
import AppNoAuth from '../containers/app-no-auth/app-no-auth';
import Home from '../containers/home/home';
import Students from '../containers/students/students';
import Users from '../containers/users/users';

import Courses from '../containers/courses/courses/courses';
import CourseSimple from '../containers/courses/course/course';
import CourseAdd from '../containers/courses/course-add/course-add';
import SignUp from '../containers/auth/sign-up';
import SignIn from '../containers/auth/sign-in';
import Page404 from '../components/page404/page404';

import { PAGES } from './pages';

import CreateLesson from '../containers/lessons/lesson-add';

const WrappedApp = (Component, props) => (
  <App>
    <Component { ...props } />
  </App>
);

const WrappedAppNoAuth = (Component, props) => (
  <AppNoAuth>
    <Component { ...props } />
  </AppNoAuth>
);

export default (
  <Switch>
    <Route
      exact path={ PAGES.signUp.path }
      render={ props => WrappedAppNoAuth(SignUp, props) }
    />
    <Route
      exact path={ PAGES.signIn.path }
      render={ props => WrappedAppNoAuth(SignIn, props) }
    />
    <Route
      exact path={ PAGES.home.path }
      render={ props => WrappedApp(Home, props) }
    />
    <Route
      path={ PAGES.students.path }
      render={ props => WrappedApp(Students, props) }
    />
    <Route
      path={ PAGES.users.path }
      render={ props => WrappedApp(Users, props) }
    />
    <Route
      exact path={ PAGES.COURSES.list.path }
      render={ props => WrappedApp(Courses, props) }
    />
    <Route
      exact path={ PAGES.COURSES.edit.path }
      render={ props => WrappedApp(CourseAdd, props)}
    />
     <Route
      exact path={ PAGES.COURSES.add.path }
      render={ props => WrappedApp(CourseAdd, props) }
    />
    <Route
      exact path={ PAGES.COURSES.show.path }
      render={ props => WrappedApp(CourseSimple, props) }
    />
    <Route
      exact path="/courses/:id/lessons/new"
      render={ props => WrappedApp(CreateLesson, props) }
    />
    <Route
      exact path={ PAGES.page404.path }
      render={ props => WrappedAppNoAuth(Page404, props) }
    />
    <Route
      path = '/'
      render={ () => (
        <Redirect to={ PAGES.page404.path } />
      ) }
    />
  </Switch>
);
