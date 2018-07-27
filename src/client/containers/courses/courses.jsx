import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { doRouteAC } from '../../redux/actions/router-actions';
import { selectSay } from '../../redux/selectors/app-selectors';
import { selectCourses } from '../../redux/selectors/courses-selectors';
import { fetchCoursesSagaAC } from '../../redux/actions/courses-actions';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CourseComponent from '../../components/courses/course-component';
import CourseAddComponent from '../../components/courses/course-add-component';

function mapStateToProps(state) {
  return {
    say: selectSay(state),
    courses_list: selectCourses(state)
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

    return (
      <div className='courses'>
        <h2>Courses Page</h2>
        Say: { say }
        <div className="courses-panel">

          <Button variant="contained" color="primary" onClick={this.addCourse}>Добавить</Button>

          { this.state.showAddCourseWindow ? 
            <CourseAddComponent />
          : null }

          <div className="courses-panel__list">
            <Grid container spacing={8} className="panel-list__header">
              <Grid item xs={2}>id</Grid>
              <Grid item xs={2}>Название</Grid>
              <Grid item xs={2}>Уникальный код</Grid>
              <Grid item xs={2}>Дата создания</Grid>
              <Grid item xs={2}>Описание</Grid>
            </Grid>
           {this.props.courses_list.map((course, index) => 
                <CourseComponent 
                  key={`course${index}`}
                  _id={course._id}
                  name={course.name}
                  code={course.code}
                  comment={course.comment}
                  dateAdded={course.dateAdded} 
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
