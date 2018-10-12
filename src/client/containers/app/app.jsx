import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { doRouteAC } from '../../redux/actions/router-actions';
import { fetchAccountSagaAC, signOutSagaAC } from '../../redux/actions/app-actions';
import AppMenu from '../../components/app-menu/app-menu';
import { PAGES } from '../../routes/pages';
import styles from './styles';
import { SITE_TITLE } from '../../constants/names';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doRoute: doRouteAC,
    fetchAccount: fetchAccountSagaAC,
    signOut: signOutSagaAC
  }, dispatch);
}

class App extends React.Component {
  static propTypes = {
    classes: Type.object.isRequired,
    children: Type.node.isRequired,
    doRoute: Type.func,
    fetchAccount: Type.func.isRequired,
    signOut: Type.func.isRequired
  };

  static defaultProps = {
  };

  state = {
    isAppMenuOpened: false
  };

  handleClickMenu = () => {
    this.setState({ isAppMenuOpened: true });
  };

  handleCloseMenu = () => {
    this.setState({ isAppMenuOpened: false });
  };

  handleClickAdmin = () => {
    this.props.doRoute(PAGES.admin.path);
  };

  handleClickHome = () => {
    this.props.doRoute(PAGES.home.path);
  };

  handleClickCourses = () => {
    this.props.doRoute(PAGES.COURSES.list.path);
  };

  handleClickStudents = () => {
    this.props.doRoute(PAGES.students.path);
  };

  handleClickUsers = () => {
    this.props.doRoute(PAGES.users.path);
  };

  handleClickSignUp = () => {
    this.props.doRoute(PAGES.signUp.path);
  };

  handleClickSignIn = () => {
    this.props.doRoute(PAGES.signIn.path);
  };

  handleClickPage404 = () => {
    this.props.doRoute(PAGES.page404.path);
  };

  handleClickPage405 = () => {
    this.props.doRoute(PAGES.page405.path);
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
    const { classes, signOut } = this.props;
    return (
      <div className={ classes.app }>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={ classes.menuButton }
              aria-label="More"
              aria-owns={ anchorEl ? 'long-app-menu' : null }
              aria-haspopup="true"
              onClick={ this.handleClickMenu }
            >
              <MenuIcon />
            </IconButton>
            <AppMenu
              isOpened={ this.state.isAppMenuOpened }
              onClose={ this.handleCloseMenu }
              mainListItems={
                <div>
                  <ListItem button onClick={this.handleClickHome}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickSignUp}>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickSignIn}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItem>
                  <ListItem button onClick={signOut}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickPage404}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Page 404" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickPage405}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Page 405" />
                  </ListItem>
                </div>
              }
              otherListItems={
                <div>
                  <ListItem button onClick={ this.handleClickAdmin }>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickCourses}>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickStudents}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                  </ListItem>
                  <ListItem button onClick={this.handleClickUsers}>
                    <ListItemIcon>
                      <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItem>
                </div>
              }
            />
            <Typography variant="title" color="inherit">
              { SITE_TITLE }
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={ classes.appChildren }>
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
