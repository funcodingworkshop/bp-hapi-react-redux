import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { doRouteAC } from '../../redux/actions/router-actions';
import { selectSay } from '../../redux/selectors/app-selectors';
import { fetchCoursesSagaAC } from '../../redux/actions/courses-actions';

function mapStateToProps(state) {
  return {
    say: selectSay(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doRoute: doRouteAC,
    fetchCourses: fetchCoursesSagaAC
  }, dispatch);
}

class Courses extends React.Component {
  static propTypes = {
    say: PropTypes.string,
    fetchCourses: PropTypes.func.isRequired
  };

  static defaultProps = {
    say: 'Nothing Yet :('
  };

  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    const { say } = this.props;
    return (
      <div className='courses'>
        <h2>Courses Page</h2>
        Say: { say }
      </div>
    );
  }
}

const VisibleCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

export default VisibleCourses;
