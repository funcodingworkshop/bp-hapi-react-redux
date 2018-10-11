import React, { Component } from 'react';
import Type from 'prop-types';
import ButtonDefault from '../button-default/button-default';

export default class Page404 extends Component {
  static propTypes = {
    classes: Type.shape({})
  };

  render() {
    return (
      <div>
        <h2>Page 404</h2>
        <ButtonDefault name='Click Me' />
      </div>
    );
  }
}
