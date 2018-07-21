import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { sayBye, sayHi } from '../../actions/actions';
import { doRouteAC } from '../../actions/router-actions';

import './home.css';
import reactImg from './react.png';
import someOtherImg from './pic.jpg';

function mapStateToProps(state) {
  return {
    say: state.app.say
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleSayBye: sayBye,
    handleSayHi: sayHi,
    doRoute: doRouteAC
  }, dispatch);
}

class Home extends React.Component {
  static propTypes = {
    say: PropTypes.string,
    handleSayBye: PropTypes.func.isRequired,
    handleSayHi: PropTypes.func.isRequired
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  render() {
    const {
      say, handleSayBye, handleSayHi
    } = this.props;
    return (
      <div className='home'>
        <h2>Home Page</h2>
        <div>
          <br/>
          <Link to='/courses'>Courses</Link>
          <br/>
          <Link to='/students'>Students</Link>
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
