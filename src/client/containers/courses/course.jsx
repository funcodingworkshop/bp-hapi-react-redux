import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { fetchCourseSagaAC, deleteCourseAC } from '../../redux/actions/courses-actions';
import { selectCourses } from '../../redux/selectors/courses-selectors';

import '../../css/courses/course-simple.css';

library.add(faTrashAlt, faPencilAlt);

class CourseSimpleComponent extends Component {
  static propTypes = {
    courses_list: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    fetchCourse: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      course: null,
      redirect: false
    };
  }

  componentDidMount() {
    let course = null;

    if (this.props.courses_list.length === 0) {
      this.props.fetchCourse(this.props.match.params.id);
    } else {
      course = this.props.courses_list.filter((item) => item._id === this.props.match.params.id)[0];
      this.setState({ course });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.courses_list !== nextProps.courses_list && nextProps.courses_list.length === 1) {
      this.setState({ course: nextProps.courses_list[0] });
    }
  }

  shouldComponentUpdate(nextState) {
    return (this.state.course !== nextState.course || this.state.redirect !== nextState.redirect);
  }

  delete = () => {
    const confirmation = window.confirm('Вы уверены, что хотите удалить курс?');
    if (confirmation) {
      this.props.deleteCourse(this.state.course._id);
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>

        <Link to="/courses"><Button className="course__btn-set_main" variant="outlined" color="primary"><span>Список курсов</span></Button></Link>
          <div className="right">

            <Link to={`/courses/${this.props.match.params.id}/edit`} className="course__btn-set" data-toogle="tooltip" title="Редактировать">
              <Button variant="contained" color="primary">
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
            </Link>

            <Button className="course__btn-set" variant="contained" color="secondary" onClick={this.delete} data-toogle="tooltip" title="Удалить">
              <FontAwesomeIcon icon="trash-alt" />
            </Button>
          </div>

         {this.state.course !== null && this.state.course !== undefined ?

           <Grid container className="course">
             <Grid item xs={12} sm={6} md={4} lg={3}>
               <div className="course__card course__card_left">
                 <div className="card__header">Название курса</div>
                 <div>{this.state.course.name}</div>
               </div>
             </Grid>

             <Grid item xs={12} sm={6} md={4} lg={3}>
               <div className="course__card course__card_right">
                 <div className="card__header">Описание курса</div>
                 <div>{this.state.course.comment}</div>
               </div>
             </Grid>

             <Link to={`/courses/${this.props.match.params.id}/lessons/new`}>
               <Button variant="contained" color="primary">
                 Добавить урок
               </Button>
             </Link>
           </Grid>

        : <div>Loading...</div>
        }

        {this.state.redirect ?
          <Redirect to="/courses" />
        : null }

      </div>);
  }
}

function mapStateToProps(state) {
  return {
    courses_list: selectCourses(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCourse: deleteCourseAC,
    fetchCourse: fetchCourseSagaAC
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseSimpleComponent);

