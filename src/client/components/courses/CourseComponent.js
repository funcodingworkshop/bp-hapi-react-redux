import React, { Component } from 'react';
import { connect } from 'react-redux';

class CourseComponent extends Component {
	render(){
		return (
			<div>
				<div>course id</div>
				<div>course name</div>
				<div>course unique code</div>
				<div>course created</div>
				<div>course desctiption</div>
			</div>
		)
	}
}

export default CourseComponent;