import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createCourseAC } from '../../redux/actions/courses-actions';
import { selectCourses } from '../../redux/selectors/courses-selectors';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CourseAddComponent extends Component {

	constructor(){
		super();
		this.state = {
		 	course_name: '',
		 	course_code: '',
		 	course_comment: '',
		 	message: ''
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.state.message !== nextState.message );
	}

	setCourseName = (e) => { this.setState({ course_name: e.target.value }) }
	setCourseCode = (e) => { this.setState({ course_code: e.target.value }) }
	setCourseComment = (e) => { this.setState({ course_comment: e.target.value }) }

	addCourse = () => {
		const current_date = Date();
		
		const data = {
			_id: 'test', //replace it
			name: this.state.course_name,
			code: this.state.course_code,
			comment: this.state.course_comment,
			dateAdded: current_date
		};

		this.props.createCourseAC(data);

		this.setState({ message: 'Course successfully added' })
	}

	render(){
		return (
			<div>
				<Input type="text" placeholder="Название курса" defaultValue={this.state.course_name} onChange={this.setCourseName}/>
				<Input type="text" placeholder="Уникальный код курса" defaultValue={this.state.course_code} onChange={this.setCourseCode} />
				<TextField multiline placeholder="Описание курса" defaultValue={this.state.course_comment} onChange={this.setCourseComment} />
				<Button variant="contained" color="primary" onClick={this.addCourse}>Сохранить</Button>
				{ this.state.message !== '' ?
					<div>{this.state.message}</div>
				: null }
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    courses_list: selectCourses(state)
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createCourseAC: createCourseAC
	}, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseAddComponent);