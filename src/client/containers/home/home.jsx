import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSay } from '../../redux/selectors/app-selectors';
import { SITE_TITLE } from '../../constants/names';

import './home.css';

function mapStateToProps(state) {
  return {
    say: selectSay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

class Home extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
      <div className='home'>
        <h2>Home Page</h2>
        <div>Welcome to { SITE_TITLE }</div>
      </div>
    );
  }
}

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default VisibleHome;
