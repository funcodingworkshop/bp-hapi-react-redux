import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { sayBye, sayHi } from '../../actions';
import './app.css';
import reactImg from './react.png';
import someOtherImg from '../../assets/img/pic.jpg';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function mapStateToProps(state) {
  return {
    say: state.app.say
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleSayBye: sayBye,
    handleSayHi: sayHi
  }, dispatch);
}

class App extends React.Component {
  static propTypes = {
    say: PropTypes.string,
    handleSayBye: PropTypes.func.isRequired,
    handleSayHi: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    console.log('this.props', this.props);
    const {
      say, handleSayBye, handleSayHi, classes
    } = this.props;
    return (
      <div className='app'>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem key='about' selected={ false } onClick={this.handleClose}>
                About
              </MenuItem>
              <MenuItem key='topics' selected={ false } onClick={this.handleClose}>
                Topics
              </MenuItem>
            </Menu>
            <Typography variant="title" color="inherit">
              Hapi React Redux Boilerplate
            </Typography>
          </Toolbar>
        </AppBar>
        <h2>App Container</h2>
        <div>
          <br/>
          <Link to='/about'>About</Link>
          <br/>
          <Link to='/topics'>Topics</Link>
          <br/>
        </div>
        <div>this.props.say</div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={ handleSayBye }>
            sayBye
          </Button>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={ handleSayHi }>
            sayHi
          </Button>
        </div>
        <br/>
        <div className='app__say'><b>{say}</b></div>
        <h3>img tag</h3>
        <img src={ reactImg } width='200px' height='200px' alt='react image' className='react-img' />
        <h3>img tag other folder</h3>
        <img src={ someOtherImg } width='200px' height='200px' alt='other image' className='other-img' />
      </div>
    );
  }
}

const WithClassesApp = withStyles(styles)(App);

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithClassesApp);

export default VisibleApp;
