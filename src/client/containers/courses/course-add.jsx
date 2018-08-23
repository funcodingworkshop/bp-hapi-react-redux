import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createCourseAC, updateCourseAC } from '../../redux/actions/courses-actions';
import { selectCourses } from '../../redux/selectors/courses-selectors';

import '../../css/global.css';
import '../../css/courses/course-add-component.css';

class CourseAddComponent extends Component {
  constructor() {
    super();
    // TODO if not using props, just add class variable state
    this.state = {
      course_name: '',
      course_code: '',
      course_comment: '',
      message: '',
      message_type: 'success',
      redirect: false
    };
  }

  componentDidMount() {
    // TODO use destructoring
    const id = this.props.match.params.id;
    if (id !== undefined) {
      // TODO move to saga
      const course = this.props.courses_list.filter(item => item._id === id)[0];
      // TODO why do you need querySelectors? Why not mapStateToProps?
      document.querySelectorAll('input')[0].value = course.name;
      document.querySelectorAll('input')[1].value = course.code;
      document.querySelectorAll('textarea')[2].value = course.comment;
      this.setState({ course_name: course.name });
      this.setState({ course_code: course.code });
      this.setState({ course_comment: course.comment });
    }
  }

  // TODO formating
  // TODO order of methods in class, SET eslint for methods ordering
  setCourseName = (e) => {
    this.setState({ course_name: e.target.value });
  };

  setCourseCode = (e) => { this.setState({ course_code: e.target.value }); }
  setCourseComment = (e) => { this.setState({ course_comment: e.target.value }); }

  // TODO maybe to use formik?
  dataValidation = () => {
    let check = false;
    if (this.state.course_code === '') check = 'Необходимо добавить код курса!';
    if (this.state.course_name === '') check = 'Необходимо ввести название курса!';
    return check;
  };

  addCourse = () => {
    const regExpRule = /edit$/;
    const check = regExpRule.test(this.props.match.path);

    // TODO add object in local state course={ name, code, comment }
    const data = {
      name: this.state.course_name,
      code: this.state.course_code,
      comment: this.state.course_comment
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


  render() {
    const regExpRule = /edit$/;

    return (
      <Grid container>

        { this.state.message !== '' ?
          <Grid item xs={12}>
            <div className={`course-message course-message_${this.state.message_type}`}>
              {this.state.message}
            </div>
          </Grid>
        : null }

        <Grid item xs={12}><h1 className="course-header">Создание курса</h1></Grid>
        <Grid item xs={12} md={6}>
          <Link to="/courses" className="no-text-decoration"><Button variant="outlined" color="primary">Список курсов</Button></Link>
        </Grid>
        <Grid item xs={12} className="course-input__container">
          <Input type="text" className="course-input" placeholder="Название курса" defaultValue={this.state.course_name} onChange={this.setCourseName} required/>
        </Grid>
        <Grid item xs={12} className="course-input__container">
          <Input type="text" className="course-input" placeholder="Уникальный код курса" defaultValue={this.state.course_code} onChange={this.setCourseCode} required/>
        </Grid>
        <Grid item xs={12} className="course-input__container">
          <TextField multiline className="course-input" placeholder="Описание курса" defaultValue={this.state.course_comment} onChange={this.setCourseComment} />
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

// TODO add course to state
function mapStateToProps(state) {
  return {
    courses_list: selectCourses(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createCourseAC,
    updateCourseAC
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseAddComponent);

