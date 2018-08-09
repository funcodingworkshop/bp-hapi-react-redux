import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


class CourseComponent extends Component {

	normalizeDate = (lnxDate) => {
		return lnxDate.replace(/T/,' ').substr(0, lnxDate.length-5);
	}

	render(){
		return (
			<Grid container spacing={8}>
				<Grid item xs={1}></Grid>
				<Grid item xs={2}>{this.props.view_id}</Grid>
				<Grid item xs={2}><Link to={`/courses/${this.props._id}`}>{this.props.name}</Link></Grid>
				<Grid item xs={2}>{this.props.code}</Grid>
				<Grid item xs={2}>{this.normalizeDate(this.props.createdAt)}</Grid>
				<Grid item xs={2}>{this.props.comment}</Grid>
				<Grid item xs={1}></Grid>
			</Grid>
		)
	}
}

export default CourseComponent;