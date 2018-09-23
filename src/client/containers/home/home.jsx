import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { sayByeAC, sayHiAC, testButtonAC, signOutSagaAC } from '../../redux/actions/app-actions';
import { doRouteAC } from '../../redux/actions/router-actions';
import { selectSay } from '../../redux/selectors/app-selectors';
import { PAGES } from '../../routes/pages';

import './home.css';
import reactImg from './react.png';
import someOtherImg from './pic.jpg';

function mapStateToProps(state) {
  return {
    say: selectSay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleSayBye: sayByeAC,
    handleSayHi: sayHiAC,
    handleTestButton: testButtonAC,
    doRoute: doRouteAC,
    signOut: signOutSagaAC
  }, dispatch);
}

class Home extends React.Component {
  static propTypes = {
    say: PropTypes.string,
    handleSayBye: PropTypes.func.isRequired,
    handleSayHi: PropTypes.func.isRequired,
    handleTestButton: PropTypes.func,
    signOut: PropTypes.func.isRequired
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  render() {
    const {
      say, handleSayBye, handleSayHi, handleTestButton, signOut
    } = this.props;
    return (
      <div className='home'>
        <h2>Home Page</h2>
        <div>
          <Link to={ PAGES.signUp.path }>Sign Up</Link>
          <br/>
          <Link to={ PAGES.signIn.path }>Sign In</Link>
          <br/>
          <Link to='#' onClick={ signOut }>Sign Out</Link>
          <br/>
          <Link to={ PAGES.COURSES.list.path }>Courses</Link>
          <br/>
          <Link to={ PAGES.students.path }>Students</Link>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={ handleSayBye }>
            Say Bye
          </Button>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={ handleSayHi }>
            Say Hi
          </Button>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={ handleTestButton }>
            Test Button
          </Button>
        </div>
        <br/>
        <div className='home__say'><b>{say}</b></div>
        <h3>img tag</h3>
        <img src={ reactImg } width='200px' height='200px' alt='react image' className='react-img' />
        <h3>img tag other folder</h3>
        <img src={ someOtherImg } width='200px' height='200px' alt='other image' className='other-img' />
      </div>
    );
  }
}

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default VisibleHome;
