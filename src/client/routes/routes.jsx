import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app/app';

export default (
  <div>
    <Route exact path="/" component={ App } />
    <Route path="/about" component={ () => <div>About</div> } />
    <Route path="/topics" component={ () => <div>Topics</div> } />
  </div>
);
