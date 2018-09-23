import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signUpSagaAC } from '../../redux/actions/app-actions';
import styles from './styles';
import {Link} from 'react-router-dom';
import {PAGES} from '../../routes/pages';

// function mapStateToProps(state) {
//   return {
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp: signUpSagaAC
  }, dispatch);
}

class SignUp extends PureComponent {
  static propTypes = {
    classes: Type.shape({}),
    signUp: Type.func.isRequired
  };

  // static defaultProps = {
  //   say: 'Nothing Yet :('
  // };

  state = {
    email: '',
    password: ''
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.signUp(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container }>
        <form noValidate autoComplete="off">
          <h2>Sign Up</h2>
          <TextField
            id="email"
            label="Email"
            className={ classes.textField }
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            className={ classes.textField }
            value={this.state.password}
            type="password"
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <div className={ classes.buttonBlock }>
            <Button
              className={ classes.button }
              variant="contained"
              color="primary"
              onClick={ this.handleSubmit }
            >
              Sign Up
            </Button>
          </div>
        </form>
        <br/>
        <div>Or <Link to={ PAGES.signIn.path }>Sign In</Link></div>
      </div>
    );
  }
}

const VisibleSignUp = connect(
  null,
  mapDispatchToProps
)(SignUp);

export default withStyles(styles)(VisibleSignUp);
