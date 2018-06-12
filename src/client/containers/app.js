import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { sayBye, sayHi } from '../actions';

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
      <div>
        <h2>App Container</h2>
        <div>this.props.say</div>
        <div>{say}</div>
        <div><button onClick={ handleSayBye }>sayBye</button></div>
        <div><button onClick={ handleSayHi }>sayHi</button></div>
      </div>
    );
  }
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;
