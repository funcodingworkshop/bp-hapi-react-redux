import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import Courses from '../containers/courses/courses';
import Students from '../containers/students/students';
import Users from '../containers/users/users';
import CourseSimple from '../components/courses/course-simple-component';

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
      exact path="/courses/:id"
      render={ props => WrappedComponent(CourseSimple, props) }
    />
    <Route 
      path="/courses/:id/edit"
      render={ () => <div>hello</div>}
    />
  </div>
);
