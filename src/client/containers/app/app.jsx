import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sayBye, sayHi } from '../../actions';
import './app.css';
import reactImg from './react.png';
import someOtherImg from '../../assets/img/pic.jpg';

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
    handleSayHi: PropTypes.func.isRequired
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  render() {
    console.log('this.props', this.props);
    const { say, handleSayBye, handleSayHi } = this.props;
    return (
      <div className='app'>
        <h2>App Container</h2>
        <div>
          <br/>
          <Link to='/about'>About</Link>
          <br/>
          <Link to='/topics'>Topics</Link>
          <br/>
        </div>
        <div>this.props.say</div>
        <div><button onClick={ handleSayBye }>sayBye</button></div>
        <div><button onClick={ handleSayHi }>sayHi</button></div>
        <div className='app__say'><b>{say}</b></div>
        <h3>img tag</h3>
        <img src={ reactImg } width='200px' height='200px' alt='react image' className='react-img' />
        <h3>img tag other folder</h3>
        <img src={ someOtherImg } width='200px' height='200px' alt='other image' className='other-img' />
      </div>
    );
  }
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;
