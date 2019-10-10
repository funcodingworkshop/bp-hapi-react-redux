import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInSagaAC } from '../../redux/actions/app-actions';
import styles from './styles';
import { PAGES } from '../../routes/pages';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn: signInSagaAC
  }, dispatch);
}

class SignIn extends PureComponent {
  static propTypes = {
    classes: Type.object,
    signIn: Type.func.isRequired
  };

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
    this.props.signIn(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container }>
        <form noValidate autoComplete="off">
          <h2>Sign In</h2>
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
              Sign In
            </Button>
          </div>
        </form>
        <br/>
        <div>Or <Link to={ PAGES.signUp.path }>Sign Up</Link></div>
      </div>
    );
  }
}

const VisibleSignIn = connect(
  null,
  mapDispatchToProps
)(SignIn);

export default withStyles(styles)(VisibleSignIn);
