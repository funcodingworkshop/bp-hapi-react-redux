import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import StarIcon from '@material-ui/icons/Star';
import SchoolIcon from '@material-ui/icons/School';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import { doRouteAC } from '../../redux/actions/router-actions';
import { fetchAccountSagaAC, signOutSagaAC } from '../../redux/actions/app-actions';
import AppMenu from '../../components/app-menu/app-menu';
import { PAGES } from '../../routes/pages';
import { selectAccount, selectIsAccountLoading } from '../../redux/selectors/app-selectors';
import AppNotifications from '../app-notifications/app-notifications';
import { VISIBLE } from './constants';

import styles from './styles';

function mapStateToProps(state) {
  return {
    account: selectAccount(state),
    isAccountLoading: selectIsAccountLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doRoute: doRouteAC,
      fetchAccount: fetchAccountSagaAC,
      signOut: signOutSagaAC
    },
    dispatch
  );
}

class App extends React.Component {
  static propTypes = {
    classes: Type.object.isRequired,
    children: Type.node.isRequired,
    doRoute: Type.func,
    fetchAccount: Type.func.isRequired,
    signOut: Type.func.isRequired,
    needAuth: Type.bool,
    account: Type.shape({}),
    isAccountLoading: Type.bool
  };

  static defaultProps = {
    needAuth: true
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

  handleClickPage = page => () => {
    this.props.doRoute(page);
  };

  handleFetchAccount = () => {
    const { fetchAccount } = this.props;
    fetchAccount();
  };

  mainListItems = () => {
    const { signOut, account } = this.props;
    const allItems = [
      {
        iconComponent: HomeIcon,
        onClick: this.handleClickPage(PAGES.home.path),
        text: 'Home',
        visible: VISIBLE.ALWAYS
      },
      {
        iconComponent: ArrowUpwardIcon,
        onClick: this.handleClickPage(PAGES.signUp.path),
        text: 'Sign Up',
        visible: VISIBLE.NOT_AUTHENTICATED
      },
      {
        iconComponent: SubdirectoryArrowLeftIcon,
        onClick: this.handleClickPage(PAGES.signIn.path),
        text: 'Sign In',
        visible: VISIBLE.NOT_AUTHENTICATED
      },
      {
        iconComponent: CloseIcon,
        onClick: signOut,
        text: 'Sign Out',
        visible: VISIBLE.AUTHENTICATED
      },
      {
        iconComponent: WarningIcon,
        onClick: this.handleClickPage(PAGES.page404.path),
        text: 'Page 404',
        visible: VISIBLE.ALWAYS
      },
      {
        iconComponent: WarningIcon,
        onClick: this.handleClickPage(PAGES.page405.path),
        text: 'Page 405',
        visible: VISIBLE.ALWAYS
      }
    ];
    if (account) {
      return allItems.filter(e => [VISIBLE.ALWAYS, VISIBLE.AUTHENTICATED].includes(e.visible));
    }
    return allItems.filter(e => [VISIBLE.ALWAYS, VISIBLE.NOT_AUTHENTICATED].includes(e.visible));
  };

  otherListItems = () => {
    const { account } = this.props;
    const allItems = [
      {
        iconComponent: StarIcon,
        onClick: this.handleClickPage(PAGES.admin.path),
        text: 'Admin',
        visible: VISIBLE.AUTHENTICATED
      },
      {
        iconComponent: SchoolIcon,
        onClick: this.handleClickPage(PAGES.COURSES.list.path),
        text: 'Courses',
        visible: VISIBLE.AUTHENTICATED
      },
      {
        iconComponent: GroupIcon,
        onClick: this.handleClickPage(PAGES.students.path),
        text: 'Students',
        visible: VISIBLE.AUTHENTICATED
      },
      {
        iconComponent: PeopleOutlineIcon,
        onClick: this.handleClickPage(PAGES.users.path),
        text: 'Users',
        visible: VISIBLE.AUTHENTICATED
      }
    ];
    if (account) {
      return allItems.filter(e => [VISIBLE.ALWAYS, VISIBLE.AUTHENTICATED].includes(e.visible));
    }
    return allItems.filter(e => [VISIBLE.ALWAYS, VISIBLE.NOT_AUTHENTICATED].includes(e.visible));
  };

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    this.handleFetchAccount();
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, account } = this.props;
    const hasAuth = Boolean(account);
    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <div className={classes.grow}>
              <IconButton
                className={classes.menuButton}
                aria-label='More'
                aria-owns={anchorEl ? 'long-app-menu' : null}
                aria-haspopup='true'
                onClick={this.handleClickMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <AppMenu
                isOpened={this.state.isAppMenuOpened}
                onClose={this.handleCloseMenu}
                mainListItems={this.mainListItems()}
                otherListItems={this.otherListItems()}
              />
            </div>
            {hasAuth && (
              <div>
                <IconButton color='inherit'>
                  <Badge badgeContent={4} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={'menu-appbar'}
                  aria-haspopup='true'
                  onClick={() => {}}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div className={classes.appChildren}>
          <AppNotifications />
          {this.props.children}
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
