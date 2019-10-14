import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { fetchCourseSagaAC, deleteCourseAC } from '../../../redux/actions/courses-actions';
import { selectCurrentCourse } from '../../../redux/selectors/courses-selectors';

import './course.css';

// TODO use decorators
function mapStateToProps(state) {
  return {
    currentCourse: selectCurrentCourse(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteCourse: deleteCourseAC,
      fetchCourse: fetchCourseSagaAC
    },
    dispatch
  );
}

class CourseSimpleComponent extends Component {
  static propTypes = {
    currentCourse: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    fetchCourse: PropTypes.func.isRequired
  };

  handleDelete = () => {
    this.props.deleteCourse(this.props.currentCourse._id);
    this.setState({ redirect: true });
  };

  constructor(props) {
    super(props);
    this.state = {
      course: null,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.match.params.id);
  }

  render() {
    const link = this.props.match.params.id;
    return (
      <div>
        <Link to='/courses'>
          <Button className='course__btn-set_main' variant='outlined' color='primary'>
            <span>Список курсов</span>
          </Button>
        </Link>
        <div className='right'>
          <Link
            to={`/courses/${link}/edit`}
            className='course__btn-set'
            data-toogle='tooltip'
            title='Редактировать'
          >
            <Button variant='contained' color='primary'>
              EDIT
            </Button>
          </Link>

          <Button
            className='course__btn-set'
            variant='contained'
            color='secondary'
            onClick={this.handleDelete}
            data-toogle='tooltip'
            title='Удалить'
          >
            DELETE
          </Button>
        </div>

        {this.props.currentCourse.name !== undefined ? (
          <Grid container className='course'>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className='course__card course__card_left'>
                <div className='card__header'>Название курса</div>
                <div>{this.props.currentCourse.name}</div>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className='course__card course__card_right'>
                <div className='card__header'>Описание курса</div>
                <div>{this.props.currentCourse.comment}</div>
              </div>
            </Grid>

            <Link to={`/courses/${link}/lessons/new`}>
              <Button variant='contained' color='primary'>
                Добавить урок
              </Button>
            </Link>
          </Grid>
        ) : (
          <div>Loading...</div>
        )}

        {this.state.redirect ? <Redirect to='/courses' /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseSimpleComponent);
