import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { normalizeDate } from '../../../functions/visual-functions';
import './courses-component.css';

class CoursesComponent extends PureComponent {
  static propTypes = {
    view_id: PropTypes.number.isRequired,
    course: PropTypes.object.isRequired
  };

  // TODO 3) add propType eslint 4) Add cn-decorator
  render() {
    const {
      _id,
      name,
      code,
      createdAt,
      comment
    } = this.props.course;

    return (
      <Grid container spacing={8}>
        <Grid item xs={1} />
        <Grid item xs={1}>{this.props.view_id}</Grid>
        <Grid item xs={2} className="course-line__link"><Link to={`/courses/${_id}`}>{name}</Link></Grid>
        <Grid item xs={1}>{code}</Grid>
        <Grid item xs={2}>{normalizeDate(createdAt)}</Grid>
        <Grid item xs={4}>{comment}</Grid>
        <Grid item xs={1}/>
      </Grid>
    );
  }
}

export default CoursesComponent;

