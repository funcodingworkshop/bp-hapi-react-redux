import React, { PureComponent } from 'react';
import Type from 'prop-types';

export default class AppNoAuth extends PureComponent {
  static propTypes = {
    children: Type.node.isRequired
  };

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
