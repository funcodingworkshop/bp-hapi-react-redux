import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
// import Type from 'prop-types';
import { PAGES } from '../../routes/pages';
import Page404 from '../../components/page404/page404';
import Page405 from '../../components/page405/page405';

export default () => (
  <div>
    <h1>Test Router</h1>
    <div>
      <Link to={ PAGES.page404.path }>Page 404</Link>
    </div>
    <div>
      <Link to={ PAGES.page405.path }>Page 405</Link>
    </div>
    <Switch>
      <Route path={ PAGES.page404.path } exact component={ Page404 } />
      <Route path={ PAGES.page405.path } exact component={ Page405 } />
    </Switch>
  </div>
);
