import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import Students from '../containers/students/students';
import Users from '../containers/users/users';

import Courses from '../containers/courses/courses/courses';
import CourseSimple from '../containers/courses/course/course';
import CourseAdd from '../containers/courses/course-add/course-add';
import CoursesNew from '../containers/courses_new/courses/courses';
import CourseSimpleNew from '../containers/courses_new/course/course';
import CourseAddNew from '../containers/courses_new/course-add/course-add';
import Sections from '../containers/sections/sections/sections';
import SectionSimple from '../containers/sections/section/section';
import SectionAdd from '../containers/sections/section-add/section-add';
import SignUp from '../containers/auth/sign-up';
import SignIn from '../containers/auth/sign-in';
import Page404 from '../containers/page404/page404';

import { PAGES } from './pages';

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
      exact path={ PAGES.home.path }
      render={ props => WrappedComponent(Home, props) }
    />
    <Route
      path={ PAGES.students.path }
      render={ props => WrappedComponent(Students, props) }
    />
    <Route
      path={ PAGES.users.path }
      render={ props => WrappedComponent(Users, props) }
    />
    <Route
      exact path={ PAGES.COURSES.list.path }
      render={ props => WrappedComponent(Courses, props) }
    />
    <Route
      exact path={ PAGES.COURSES.edit.path }
      render={ props => WrappedComponent(CourseAdd, props)}
    />
     <Route
      exact path={ PAGES.COURSES.add.path }
      render={ props => WrappedComponent(CourseAdd, props) }
    />
    <Route
      exact path={ PAGES.COURSES.show.path }
      render={ props => WrappedComponent(CourseSimple, props) }
    />
    <Route
      exact path="/courses/:id/lessons/new"
      render={ props => WrappedComponent(CreateLesson, props) }
    />

    <Route
      exact path={ PAGES.COURSES_NEW.list.path }
      render={ props => WrappedComponent(CoursesNew, props) }
    />
    <Route
      exact path={ PAGES.COURSES_NEW.edit.path }
      render={ props => WrappedComponent(CourseAddNew, props)}
    />
     <Route
      exact path={ PAGES.COURSES_NEW.add.path }
      render={ props => WrappedComponent(CourseAddNew, props) }
    />
    <Route
      exact path={ PAGES.COURSES_NEW.show.path }
      render={ props => WrappedComponent(CourseSimpleNew, props) }
    />
    <Route
      exact path="/courses_new/:id/lessons/new"
      render={ props => WrappedComponent(CreateLesson, props) }
    />

    <Route
      exact path={ PAGES.SECTIONS.list.path }
      render={ props => WrappedComponent(Sections, props) }
    />
    <Route
      exact path={ PAGES.SECTIONS.edit.path }
      render={ props => WrappedComponent(SectionAdd, props)}
    />
     <Route
      exact path={ PAGES.SECTIONS.add.path }
      render={ props => WrappedComponent(SectionAdd, props) }
    />
    <Route
      exact path={ PAGES.SECTIONS.show.path }
      render={ props => WrappedComponent(SectionSimple, props) }
    />
    <Route
      exact path="/sections/:id/lessons/new"
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
