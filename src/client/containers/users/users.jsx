import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { doRouteAC } from '../../redux/actions/router-actions';
import { selectSay } from '../../redux/selectors/app-selectors';

function mapStateToProps(state) {
  return {
    say: selectSay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doRoute: doRouteAC
  }, dispatch);
}

class Users extends React.Component {
  static propTypes = {
    say: PropTypes.string
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  render() {
    const { say } = this.props;
    return (
      <div className='courses'>
        <h2>Users Page</h2>
        Say: { say }
      </div>
    );
  }
}

const VisibleUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default VisibleUsers;
