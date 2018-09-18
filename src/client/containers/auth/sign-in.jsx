import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Type from 'prop-types';
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import { doRouteAC } from '../../redux/actions/router-actions';
import { createBemClassFactory } from '../../utils/bem';

import './sign-in.css';

const cn = createBemClassFactory('sign-in');

// function mapStateToProps(state) {
//   return {
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//   }, dispatch);
// }

class SignIn extends PureComponent {
  static propTypes = {
    say: Type.string
  };

  // static defaultProps = {
  //   say: 'Nothing Yet :('
  // };

  render() {
    const { say } = this.props;
    return (
      <div className={ cn() }>
        <h2>Sign In</h2>
        <div>{ say }</div>
      </div>
    );
  }
}

// const VisibleSignUp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default SignIn;
