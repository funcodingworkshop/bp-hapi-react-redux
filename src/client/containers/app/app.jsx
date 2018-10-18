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
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import StarIcon from '@material-ui/icons/Star';
import SchoolIcon from '@material-ui/icons/School';
import GroupIcon from '@material-ui/icons/Group';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { doRouteAC } from '../../redux/actions/router-actions';
import { fetchAccountSagaAC, signOutSagaAC } from '../../redux/actions/app-actions';
import AppMenu from '../../components/app-menu/app-menu';
import { PAGES } from '../../routes/pages';
import { SITE_TITLE } from '../../constants/names';
import { selectAccount, selectIsAccountLoading } from '../../redux/selectors/app-selectors';
import { VISIBLE } from './constants';

import styles from './styles';

function mapStateToProps(state) {
  return {
    account: selectAccount(state),
    isAccountLoading: selectIsAccountLoading(state)
  };
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
      { iconComponent: HomeIcon,
        onClick: this.handleClickPage(PAGES.home.path),
        text: 'Home',
        visible: VISIBLE.ALWAYS },
      { iconComponent: ArrowUpwardIcon,
        onClick: this.handleClickPage(PAGES.signUp.path),
        text: 'Sign Up',
        visible: VISIBLE.NOT_AUTHENTICATED },
      { iconComponent: SubdirectoryArrowLeftIcon,
        onClick: this.handleClickPage(PAGES.signIn.path),
        text: 'Sign In',
        visible: VISIBLE.NOT_AUTHENTICATED },
      { iconComponent: CloseIcon,
        onClick: signOut,
        text: 'Sign Out',
        visible: VISIBLE.AUTHENTICATED },
      { iconComponent: WarningIcon,
        onClick: this.handleClickPage(PAGES.page404.path),
        text: 'Page 404',
        visible: VISIBLE.ALWAYS },
      { iconComponent: WarningIcon,
        onClick: this.handleClickPage(PAGES.page405.path),
        text: 'Page 405',
        visible: VISIBLE.ALWAYS }
    ];
    if (account) {
      return allItems.filter(e => ([VISIBLE.ALWAYS, VISIBLE.AUTHENTICATED].includes(e.visible)));
    }
    return allItems.filter(e => ([VISIBLE.ALWAYS, VISIBLE.NOT_AUTHENTICATED].includes(e.visible)));
  };

  otherListItems = () => {
    const { account } = this.props;
    const allItems = [
      { iconComponent: StarIcon,
        onClick: this.handleClickPage(PAGES.admin.path),
        text: 'Admin',
        visible: VISIBLE.AUTHENTICATED },
      { iconComponent: SchoolIcon,
        onClick: this.handleClickPage(PAGES.COURSES.list.path),
        text: 'Courses',
        visible: VISIBLE.AUTHENTICATED },
      { iconComponent: GroupIcon,
        onClick: this.handleClickPage(PAGES.students.path),
        text: 'Students',
        visible: VISIBLE.AUTHENTICATED },
      { iconComponent: PeopleOutlineIcon,
        onClick: this.handleClickPage(PAGES.users.path),
        text: 'Users',
        visible: VISIBLE.AUTHENTICATED }
    ];
    if (account) {
      return allItems.filter(e => ([VISIBLE.ALWAYS, VISIBLE.AUTHENTICATED].includes(e.visible)));
    }
    return allItems.filter(e => ([VISIBLE.ALWAYS, VISIBLE.NOT_AUTHENTICATED].includes(e.visible)));
  };

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    this.handleFetchAccount();
  }

  render() {
    console.log('isAccountLoading', this.props.isAccountLoading);
    console.log('account', this.props.account);
    const { anchorEl } = this.state;
    const { classes } = this.props;
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
              mainListItems={ this.mainListItems() }
              otherListItems={ this.otherListItems() }
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
