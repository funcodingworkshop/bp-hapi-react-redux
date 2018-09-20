import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signUpSagaAC } from '../../redux/actions/app-actions';
import styles from './styles';

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
    login: '',
    password: ''
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    console.log(3337);
    this.props.signUp(this.state);
  };

  render() {
    console.log('state', this.state);
    const { classes } = this.props;
    return (
      <div className={classes.container }>
        <form noValidate autoComplete="off">
          <h2>Sign Up</h2>
          <TextField
            id="login"
            label="Login"
            className={ classes.textField }
            value={this.state.login}
            onChange={this.handleChange('login')}
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
      </div>
    );
  }
}

const VisibleSignUp = connect(
  null,
  mapDispatchToProps
)(SignUp);

export default withStyles(styles)(VisibleSignUp);
