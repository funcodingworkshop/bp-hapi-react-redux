import React from 'react';
import { Route, Switch } from 'react-router';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import Students from '../containers/students/students';
import Users from '../containers/users/users';

import Courses from '../containers/courses/courses';
import CourseSimple from '../containers/courses/course';
import CourseAdd from '../containers/courses/course-add';

import CreateLesson from '../containers/lessons/lesson-add';

const WrappedComponent = (Component, props) => (
  <App>
    <Component { ...props } />
  </App>
);

export default (
  <div>
    <Route
      exact path="/"
      render={ props => WrappedComponent(Home, props) }
    />
    <Route
      exact path="/courses"
      render={ props => WrappedComponent(Courses, props) }
    />
    <Route
      path="/students"
      render={ props => WrappedComponent(Students, props) }
    />
    <Route
      path="/users"
      render={ props => WrappedComponent(Users, props) }
    />
    <Route
      path="/courses/:id/edit"
      render={ props => WrappedComponent(CourseAdd, props)}
    />
    <Switch>
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
    </Switch>
  </div>
);
