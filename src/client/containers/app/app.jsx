import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { doRouteAC } from '../../redux/actions/router-actions';
import { fetchAccountSagaAC } from '../../redux/actions/app-actions';

import './app.css';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doRoute: doRouteAC,
    fetchAccount: fetchAccountSagaAC
  }, dispatch);
}

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    doRoute: PropTypes.func,
    fetchAccount: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  state = {
    anchorEl: null
  };

  handleClickMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickMenuHome = () => {
    this.handleClose();
    this.props.doRoute('/');
  };

  handleClickMenuCourses = () => {
    this.handleClose();
    this.props.doRoute('/courses');
  };

  handleClickMenuStudents = () => {
    this.handleClose();
    this.props.doRoute('/students');
  };

  handleClickMenuUsers = () => {
    this.handleClose();
    this.props.doRoute('/users');
  };

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    this.props.fetchAccount();
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div className='app'>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClickMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem key='home' selected={ false } onClick={this.handleClickMenuHome}>
                Home
              </MenuItem>
              <MenuItem key='courses' selected={ false } onClick={this.handleClickMenuCourses}>
                Courses
              </MenuItem>
              <MenuItem key='students' selected={ false } onClick={this.handleClickMenuStudents}>
                Students
              </MenuItem>
              <MenuItem key='users' selected={ false } onClick={this.handleClickMenuUsers}>
                Users
              </MenuItem>
            </Menu>
            <Typography variant="title" color="inherit">
              Hapi React Redux Boilerplate
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="app__children">
          { this.props.children }
        </div>
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
