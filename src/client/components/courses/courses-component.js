// TODO use PureComponent
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// TODO move css file to component
import '../../css/courses/course-component.css';

// TODO component name same as file-name, should be CoursesComponent or CoursesRow
class CourseComponent extends Component {
  // TODO 1) move to separate file and add tests, 2) add propTypes
  // TODO 3) add propType eslint 4) Add cn-decorator
  normalizeDate = (lnxDate) => {
    if (lnxDate !== undefined) {
      return lnxDate.replace(/T/, ' ').substr(0, lnxDate.length - 5);
    }
    return lnxDate;
  };

  render() {
    const { _id, name } = this.props.course;
    return (
      <Grid container spacing={8}>
        <Grid item xs={1} />
        <Grid item xs={1}>{this.props.view_id}</Grid>
        <Grid item xs={2} className="course-line__link"><Link to={`/courses/${_id}`}>{name}</Link></Grid>
        <Grid item xs={1}>{this.props.course.code}</Grid>
        <Grid item xs={2}>{this.normalizeDate(this.props.course.createdAt)}</Grid>
        <Grid item xs={4}>{this.props.course.comment}</Grid>
        <Grid item xs={1}/>
      </Grid>
    );
  }
}

export default CourseComponent;

