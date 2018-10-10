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

import { createSectionAC, updateSectionAC, fetchSectionSagaAC } from '../../../redux/actions/sections-actions';
import { selectCurrentSection } from '../../../redux/selectors/sections-selectors';

import '../../../css/global.css';
import './section-add.css';

function mapStateToProps(state) {
  return {
    currentSection: selectCurrentSection(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSectionAC,
    updateSectionAC,
    fetchSectionSagaAC
  }, dispatch);
}

class SectionAddComponent extends Component {
  static propTypes = {
    currentSection: Type.shape({
      name: Type.string,
      duration: Type.string,
      comment: Type.string,
      course: Type.string
    }),
    createSectionAC: Type.func.isRequired,
    updateSectionAC: Type.func.isRequired,
    match: Type.shape({
      params: Type.shape({
        id: Type.string
      }),
      path: Type.string
    }),
    fetchSectionSagaAC: Type.func
  }

  // TODO order of methods in class, SET eslint for methods ordering
  setSectionName = (e) => {
    this.setState({ sectionName: e.target.value });
  };

  setSectionDuration = (e) => {
    this.setState({ sectionDuration: e.target.value });
  };

  setSectionComment = (e) => {
    this.setState({ sectionComment: e.target.value });
  };

  setSectionCourse = (e) => {
    this.setState({ sectionCourse: e.target.value });
  };

  dataValidation = () => {
    let check = false;
    if (this.state.sectionCourse === '') check = 'Необходимо добавить код курса!';
    if (this.state.sectionName === '') check = 'Необходимо ввести название раздела!';
    return check;
  };

  addSection = () => {
    const regExpRule = /edit$/;
    const check = regExpRule.test(this.props.match.path);

    const data = {
      name: this.state.sectionName,
      duration: this.state.sectionDuration,
      comment: this.state.sectionComment,
      course: this.state.sectionCourse
    };

    if (!this.dataValidation()) {
      if (!check) {
        this.props.createSectionAC(data);
        this.setState({ message: 'Раздел успешно добавлен' });
        // setTimeout(() => this.setState({ message: ""}), 3000);
        setTimeout(() => this.setState({ redirect: true }), 2000);
      } else {
        this.props.updateSectionAC(this.props.match.params.id, data);
        this.setState({ message: 'Раздел успешно обновлён' });
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
      sectionName: '',
      sectionDuration: '',
      sectionComment: '',
      sectionCourse: '',
      message: '',
      message_type: 'success',
      redirect: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.props.fetchSectionSagaAC(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentSection !== nextProps.currentSection) {
      this.setState({ sectionName: nextProps.currentSection.name });
      this.setState({ sectionDuration: nextProps.currentSection.duration });
      this.setState({ sectionComment: nextProps.currentSection.comment });
      this.setState({ sectionCourse: nextProps.currentSection.course });
    }
  }

  render() {
    const regExpRule = /edit$/;
    return (
      <Grid container>

        { this.state.message !== '' ?
          <Grid item xs={12}>
            <div className={`section-add__message section-add__message_${this.state.message_type}`}>
              {this.state.message}
            </div>
          </Grid>
        : null }

        <Grid item xs={12}><h1 className="section-add__header">Создание раздела курса</h1></Grid>
        <Grid item xs={12} md={6}>
          <Link to="/sections" className="no-text-decoration"><Button variant="outlined" color="primary">Список разделов</Button></Link>
        </Grid>
        <Grid item xs={12} className="section-add__input__container">
          <Input type="text" className="section-add__input" placeholder="Название раздела" value={this.state.sectionName} onChange={this.setSectionName} required/>
        </Grid>
        <Grid item xs={12} className="section-add__input__container">
          <Input type="text" className="section-add__input" placeholder="Длительность раздела" value={this.state.sectionDuration} onChange={this.setSectionDuration} required/>
        </Grid>
        <Grid item xs={12} className="section-add__input__container">
          <TextField multiline className="section-add__input" placeholder="Описание раздела" value={this.state.sectionComment} onChange={this.setSectionComment} />
        </Grid>
        <Grid item xs={12} className="section-add__input__container">
          <TextField multiline className="section-add__input" placeholder="Код курса" value={this.state.sectionCourse} onChange={this.setSectionCourse} />
        </Grid>
        <Grid item xs={12}>
          <div className="custom-btn_center">
            {!regExpRule.test(this.props.match.path) ?
              <Button variant="contained" color="primary" size="large" onClick={this.addSection}>Сохранить</Button>
            :
              <Button variant="contained" color="primary" size="large" onClick={this.addSection}>Сохранить изменения</Button>
            }
          </div>
        </Grid>
        {this.state.redirect ?
          <Redirect to="/sections" />
        : null }
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionAddComponent);
