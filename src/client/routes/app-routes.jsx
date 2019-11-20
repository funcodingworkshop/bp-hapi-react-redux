import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { PAGES } from './pages';
import Page404 from '../components/page404/page404';
import Page405 from '../components/page405/page405';
import SignUp from '../containers/auth/sign-up';
import SignIn from '../containers/auth/sign-in';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import HomeAdmin from '../containers/home-admin/home-admin';
import Students from '../containers/students/students';
import Users from '../containers/users/users';
import Courses from '../containers/courses/courses/courses';
import CourseAdd from '../containers/courses/course-add/course-add';
import CourseSimple from '../containers/courses/course/course';
import CreateLesson from '../containers/lessons/lesson-add';
import Clients from '../containers/clients/client-get/client';

const WrappedApp = (Component, props, needAuth = true) => (
  <App needAuth={needAuth}>
    <Component {...props} />
  </App>
);

export default () => (
  <Switch>
    <Route
      exact path={PAGES.signUp.path}
      render={props => WrappedApp(SignUp, props, false)}
    />
    <Route
      exact path={PAGES.signIn.path}
      render={props => WrappedApp(SignIn, props, false)}
    />
    <Route
      exact path={PAGES.home.path}
      render={props => WrappedApp(Home, props, false)}
    />
    <Route
      exact path={PAGES.admin.path}
      render={props => WrappedApp(HomeAdmin, props)}
    />
    <Route
      path={PAGES.students.path}
      render={props => WrappedApp(Students, props)}
    />
    <Route
      path={PAGES.users.path}
      render={props => WrappedApp(Users, props)}
    />
    <Route
      exact path={PAGES.COURSES.list.path}
      render={props => WrappedApp(Courses, props)}
    />
    <Route
      exact path={PAGES.COURSES.edit.path}
      render={props => WrappedApp(CourseAdd, props)}
    />
    <Route
      exact path={PAGES.COURSES.add.path}
      render={props => WrappedApp(CourseAdd, props)}
    />
    <Route
      exact path={PAGES.COURSES.show.path}
      render={props => WrappedApp(CourseSimple, props)}
    />
    <Route
      exact path="/courses/:id/lessons/new"
      render={props => WrappedApp(CreateLesson, props)}
    />
    <Route
      exact path={PAGES.clients.path}
      render={props => WrappedApp(Clients, props)}
    />
    <Route
      exact path={PAGES.page405.path}
      render={props => WrappedApp(Page405, props, false)}
    />
    <Route
      exact path={PAGES.page404.path}
      render={props => WrappedApp(Page404, props, false)}
    />
    <Route
      path='/'
      render={() => (
        <Redirect to={PAGES.page404.path} />
      )}
    />
  </Switch>
);
