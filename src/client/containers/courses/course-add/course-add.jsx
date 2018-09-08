import React, { Component } from 'react';
import Type from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createCourseAC, updateCourseAC, fetchCourseSagaAC } from '../../../redux/actions/courses-actions';
import { selectCurrentCourse } from '../../../redux/selectors/courses-selectors';

import '../../../css/global.css';
import './course-add.css';

function mapStateToProps(state) {
  return {
    currentCourse: selectCurrentCourse(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createCourseAC,
    updateCourseAC,
    fetchCourseSagaAC
  }, dispatch);
}

class CourseAddComponent extends Component {
  static propTypes = {
    currentCourse: Type.shape({
      name: Type.string,
      code: Type.string,
      comment: Type.string
    }),
    createCourseAC: Type.func.isRequired,
    updateCourseAC: Type.func.isRequired,
    match: Type.shape({
      params: Type.shape({
        id: Type.string
      }),
      path: Type.string
    }),
    fetchCourseSagaAC: Type.func
  }

  // TODO order of methods in class, SET eslint for methods ordering
  setCourseName = (e) => {
    this.setState({ courseName: e.target.value });
  };

  setCourseCode = (e) => {
    this.setState({ courseCode: e.target.value });
  };

  setCourseComment = (e) => {
    this.setState({ courseComment: e.target.value });
  };

  dataValidation = () => {
    let check = false;
    if (this.state.courseCode === '') check = 'Необходимо добавить код курса!';
    if (this.state.courseName === '') check = 'Необходимо ввести название курса!';
    return check;
  };

  addCourse = () => {
    const regExpRule = /edit$/;
    const check = regExpRule.test(this.props.match.path);

    const data = {
      name: this.state.courseName,
      code: this.state.courseCode,
      comment: this.state.courseComment
    };

    if (!this.dataValidation()) {
      if (!check) {
        this.props.createCourseAC(data);
        this.setState({ message: 'Курс успешно добавлен' });
        // setTimeout(() => this.setState({ message: ""}), 3000);
        setTimeout(() => this.setState({ redirect: true }), 2000);
      } else {
        this.props.updateCourseAC(this.props.match.params.id, data);
        this.setState({ message: 'Курс успешно обновлён' });
        setTimeout(() => this.setState({ redirect: true }), 2000);
      }

      this.setState({ message_type: 'success ' });
    } else {
      this.setState({ message: this.dataValidation() });
      this.setState({ message_type: 'error ' });
    }
  }

  constructor() {
    super();
    // TODO if not using props, just add class variable state
    this.state = {
      courseName: '',
      courseCode: '',
      courseComment: '',
      message: '',
      message_type: 'success',
      redirect: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.props.fetchCourseSagaAC(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentCourse !== nextProps.currentCourse) {
      this.setState({ courseName: nextProps.currentCourse.name });
      this.setState({ courseCode: nextProps.currentCourse.code });
      this.setState({ courseComment: nextProps.currentCourse.comment });
    }
  }

  render() {
    const regExpRule = /edit$/;
    return (
      <Grid container>

        { this.state.message !== '' ?
          <Grid item xs={12}>
            <div className={`course-add__message course-add__message_${this.state.message_type}`}>
              {this.state.message}
            </div>
          </Grid>
        : null }

        <Grid item xs={12}><h1 className="course-add__header">Создание курса</h1></Grid>
        <Grid item xs={12} md={6}>
          <Link to="/courses" className="no-text-decoration"><Button variant="outlined" color="primary">Список курсов</Button></Link>
        </Grid>
        <Grid item xs={12} className="course-add__input__container">
          <Input type="text" className="course-add__input" placeholder="Название курса" value={this.state.courseName} onChange={this.setCourseName} required/>
        </Grid>
        <Grid item xs={12} className="course-add__input__container">
          <Input type="text" className="course-add__input" placeholder="Уникальный код курса" value={this.state.courseCode} onChange={this.setCourseCode} required/>
        </Grid>
        <Grid item xs={12} className="course-add__input__container">
          <TextField multiline className="course-add__input" placeholder="Описание курса" value={this.state.courseComment} onChange={this.setCourseComment} />
        </Grid>
        <Grid item xs={12}>
          <div className="custom-btn_center">
            {!regExpRule.test(this.props.match.path) ?
              <Button variant="contained" color="primary" size="large" onClick={this.addCourse}>Сохранить</Button>
            :
              <Button variant="contained" color="primary" size="large" onClick={this.addCourse}>Сохранить изменения</Button>
            }
          </div>
        </Grid>
        {this.state.redirect ?
          <Redirect to="/courses" />
        : null }
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseAddComponent);
