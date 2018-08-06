import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { deleteCourseAC } from '../../redux/actions/courses-actions';
import { selectCourses } from '../../redux/selectors/courses-selectors';


class CourseSimpleComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			course: null,
			redirect: false
		}
	}

	componentDidMount(){
		const course =  this.props.courses_list.filter((course) => course._id === this.props.match.params.id)[0];
		this.setState({ course })
	}

	shouldComponentUpdate(nextState) {
		return (this.state.course !== nextState.course || this.state.redirect !== nextState.redirect);
	}

	delete = () => {
		this.props.deleteCourseAC(this.state.course._id);
		this.setState({ redirect: true })
	}

	render() {
		return (
			<div>
				<Link to="/courses"><Button variant="contained" color="default">Список курсов</Button></Link>
				<Button variant="contained" color="primary">Редактировать курс</Button>
				<Button variant="contained" color="secondary" onClick={this.delete}>Удалить курс</Button>

				{this.state.course !== null && this.state.course !== undefined ? 
					<Grid container spacing={8}>
						<Grid container>
							<Grid item xs={6}>Название курса</Grid>
							<Grid item xs={6}>{this.state.course.name}</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={6}>Описание курса</Grid>
							<Grid item xs={6}>{this.state.course.comment}</Grid>
						</Grid>
					</Grid>
					: <div>Loading...</div>
				}

				{this.state.redirect ? 
					<Redirect to="/courses" />
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
		deleteCourseAC: deleteCourseAC
	}, dispatch)
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseSimpleComponent);

