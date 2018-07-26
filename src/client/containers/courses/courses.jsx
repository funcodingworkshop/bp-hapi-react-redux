import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { doRouteAC } from '../../redux/actions/router-actions';
import { selectSay } from '../../redux/selectors/app-selectors';
import { fetchCoursesSagaAC } from '../../redux/actions/courses-actions';

import CourseComponent from '../../components/courses/CourseComponent';
import CourseAddComponent from '../../components/courses/CourseAddComponent';

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

  constructor(){
    super();
    this.state = {
      showAddCourseWindow: false
    }
  }

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

  addCourse = () => {
    this.setState({ showAddCourseWindow: !this.state.showAddCourseWindow })
  }

  render() {
    const { say } = this.props;
    const courses_mockup = [
  {id: 1, name: 'course1', payload: 'some'},
  {id: 2, name: 'course2', pyaload: 'some2'}
]
//id, name,unique_code,created,description
    return (
      <div className='courses'>
        <h2>Courses Page</h2>
        Say: { say }
        <div className="courses-panel">
          <button onClick={this.addCourse}>Добавить</button>
          { this.state.showAddCourseWindow ? 
            <CourseAddComponent />
          : null }
          <div className="courses-panel__list">
            <div className="panel-list__header">
              <div>id</div>
              <div>Название</div>
              <div>Уникальный код</div>
              <div>Дата создания</div>
              <div>Описание</div>
            </div>
           {courses_mockup.map((course, index) => 
                <CourseComponent 
                  key={`course${index}`} 
                />
           )}
          </div>
        </div>
      </div>
    );
  }
}

const VisibleCourses = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);

export default VisibleCourses;
