import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import '../../css/courses/course-component.css';

class CourseComponent extends Component {
  normalizeDate = (lnxDate) => {
    if (lnxDate !== undefined) {
      return lnxDate.replace(/T/, ' ').substr(0, lnxDate.length - 5);
    }
    return lnxDate;
  }

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>{this.props.view_id}</Grid>
        <Grid item xs={2} className="course-line__link"><Link to={`/courses/${this.props.course._id}`}>{this.props.course.name}</Link></Grid>
        <Grid item xs={1}>{this.props.course.code}</Grid>
        <Grid item xs={2}>{this.normalizeDate(this.props.course.createdAt)}</Grid>
        <Grid item xs={4}>{this.props.course.comment}</Grid>
        <Grid item xs={1}></Grid>
      </Grid>);
  }
}

export default CourseComponent;

