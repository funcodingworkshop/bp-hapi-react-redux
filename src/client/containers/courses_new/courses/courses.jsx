import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CoursesComponent from '../../../components/courses/courses-component/courses-component_new';

import { doRouteAC } from '../../../redux/actions/router-actions';
import { selectCourses } from '../../../redux/selectors/courses-selectors';
import { fetchCoursesSagaAC } from '../../../redux/actions/courses-actions';


import './courses.css';

function mapStateToProps(state) {
  return {
    coursesList: selectCourses(state)
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
    fetchCourses: PropTypes.func.isRequired,
    coursesList: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    return (
      <div className='courses'>
        <h2>Courses New Page</h2>
        <div className="courses__panel">

          <Link to="/courses_new/add"><Button variant="contained" color="primary">Создать курс</Button></Link>

          <div className="courses__panel-list">

            <Grid container spacing={8} className="courses__panel-list__header">
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>id</Grid>
              <Grid item xs={2}>Название курса</Grid>
              <Grid item xs={1}>Код</Grid>
              <Grid item xs={2}>Дата создания</Grid>
              <Grid item xs={4}>Описание</Grid>
              <Grid item xs={1}></Grid>
            </Grid>

           {this.props.coursesList.map((course, index) =>
              <div className="courses-line" key={`line${index}`}>
                <CoursesComponent
                  key={`course${index}`}
                  viewId={index + 1}
                  course={course}
                />
              </div>)
            }

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

