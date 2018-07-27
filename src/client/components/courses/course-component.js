import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


class CourseComponent extends Component {
	render(){
		return (
			<Grid container spacing={8}>
				<Grid item xs={2}><Link to={`/courses/${this.props._id}`}>{this.props._id}</Link></Grid>
				<Grid item xs={2}>{this.props.name}</Grid>
				<Grid item xs={2}>{this.props.code}</Grid>
				<Grid item xs={2}>{this.props.dateAdded}</Grid>
				<Grid item xs={2}>{this.props.comment}</Grid>
			</Grid>
		)
	}
}

export default CourseComponent;