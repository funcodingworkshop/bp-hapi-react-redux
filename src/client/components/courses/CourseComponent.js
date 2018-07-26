import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../css/global.css';

class CourseComponent extends Component {
	render(){
		return (
			<div>
				<div className="upper-test"> blblb
					<div className="test">Test</div>
				</div>
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