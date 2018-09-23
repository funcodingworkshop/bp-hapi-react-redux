import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import Students from '../containers/students/students';
import Users from '../containers/users/users';

import Courses from '../containers/courses/courses/courses';
import CourseSimple from '../containers/courses/course/course';
import CourseAdd from '../containers/courses/course-add/course-add';
import SignUp from '../containers/auth/sign-up';
import SignIn from '../containers/auth/sign-in';
import Page404 from '../containers/page404/page404';

import PAGES from './pages';

import CreateLesson from '../containers/lessons/lesson-add';

const WrappedComponent = (Component, props) => (
  <App>
    <Component { ...props } />
  </App>
);

export default (
  <Switch>
    <Route
      exact path={ PAGES.signUp.path }
      component={ SignUp }
    />
    <Route
      exact path={ PAGES.signIn.path }
      component={ SignIn }
    />
    <Route
      exact path="/"
      render={ props => WrappedComponent(Home, props) }
    />
    <Route
      path={ PAGES.students.path }
      render={ props => WrappedComponent(Students, props) }
    />
    <Route
      path="/users"
      render={ props => WrappedComponent(Users, props) }
    />
    <Route
      exact path={ PAGES.courses.path }
      render={ props => WrappedComponent(Courses, props) }
    />
    <Route
      exact path="/courses/:id/edit"
      render={ props => WrappedComponent(CourseAdd, props)}
    />
     <Route
      exact path="/courses/add"
      render={ props => WrappedComponent(CourseAdd, props) }
    />
    <Route
      exact path="/courses/:id"
      render={ props => WrappedComponent(CourseSimple, props) }
    />
    <Route
      exact path="/courses/:id/lessons/new"
      render={ props => WrappedComponent(CreateLesson, props) }
    />
    <Route
      path = '/'
      render={ () => (
        <Redirect to={ PAGES.page404.path } />
      ) }
    />
    <Route
      exact path={ PAGES.page404.path }
      component={ Page404 }
    />
  </Switch>
);
