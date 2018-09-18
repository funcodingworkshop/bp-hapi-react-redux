import React, { PureComponent } from 'react';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  form: {
    flexDirection: 'column'
  },
  textField: {
    display: 'flex',
    maxWidth: 400
  },
  buttonBlock: {
    display: 'flex',
    paddingTop: 20,
    maxWidth: 400,
    width: '100%'
  },
  button: {
    margin: 'auto',
    width: 400
  }
});

// function mapStateToProps(state) {
//   return {
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//   }, dispatch);
// }

class SignUp extends PureComponent {
  static propTypes = {
    classes: Type.shape({})
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
              onClick={ () => {} }
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// const VisibleSignUp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default withStyles(styles)(SignUp);
