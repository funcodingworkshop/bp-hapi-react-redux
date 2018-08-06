import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app/app';
import Home from '../containers/home/home';
import Courses from '../containers/courses/courses';
import Students from '../containers/students/students';
import Users from '../containers/users/users';

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
      path="/courses"
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
      path="/courses/?id"
      render={ () => <h1>hellow</h1> }
    />
  </div>
);
