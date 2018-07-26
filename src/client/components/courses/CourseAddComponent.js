import React, { Component } from 'react';

class CourseAddComponent extends Component {

	constructor(){
		super();
		this.state = {
		 	course_name: '',
		 	course_code: '',
		 	course_description: '',
		 	message: ''
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.state.message !== nextState.message );
	}

	setCourseName = (e) => { this.setState({ course_name: e.target.value }) }
	setCourseCode = (e) => { this.setState({ course_code: e.target.value }) }
	setCourseDescription = (e) => { this.setState({ state_description: e.target.value }) }

	addCourse = () => {
		this.setState({ message: 'Course successfully added' })
	}

	render(){
		console.log(this.state.message);
		return (
			<div>
				<input type="text" placeholder="Название курса" defaultValue={this.state.course_name} onChange={this.setCourseName}/>
				<input type="text" placeholder="Уникальный код курса" defaultValue={this.state.course_code} onChange={this.setCourseCode} />
				<textarea placeholder="Описание курса" defaultValue={this.state.course_description} onChange={this.setCourseDescription}></textarea>
				<button onClick={this.AddCourse}>Сохранить</button>
				{ this.state.message !== '' ?
					<div>{this.state.message}</div>
				: null }
			</div>
		)
	}
}

export default CourseAddComponent;