import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Type from 'prop-types';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CreateLesson extends Component {
  static propTypes = {
    match: Type.shape({
      params: Type.shape({
        id: Type.string
      }),
      path: Type.string
    })
  };

  constructor() {
    super();
    this.state = {
      name: '',
      video: '',
      task: '',
      comment: '',
      checked: false
    };
  }

  shouldComponentUpdate(nextState) {
    return this.state.checked !== nextState.checked;
  }

  setName = e => {
    this.setState({ name: e.target.value });
  };

  setVideoLink = e => {
    this.setState({ video: e.target.value });
  };

  setTask = e => {
    this.setState({ task: e.target.value });
  };

  setComment = e => {
    this.setState({ comment: e.target.value });
  };

  checkEmail = () => {
    this.setState({ checked: !this.state.checked });
  };

  saveData = () => {
    const data = {
      name: this.state.name,
      video: this.state.video,
      task: this.state.task,
      comment: this.state.comment,
      checked: this.state.checked
    };
    console.log(data);
  };

  render() {
    return (
      <div>
        <div>Добавление урока</div>

        <Link to={`/courses/${this.props.match.params.id}`}>
          <Button variant='contained'>Просмотр курса</Button>
        </Link>

        <div>
          <Input
            placeholder='Название урока'
            defaultValue={this.state.name}
            onChange={this.setName}
          />
          <Input
            placeholder='Видео (ссылка на Youtube видео)'
            defaultValue={this.state.video}
            onChange={this.setVideoLink}
          />
          <TextField
            placeholder='Задание к уроку'
            multiline
            defaultValue={this.state.task}
            onChange={this.setTask}
          />
          <TextField
            placeholder='Комментарий к уроку'
            multiline
            defaultValue={this.state.comment}
            onChange={this.setComment}
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.checked} onChange={this.checkEmail} />}
            label='Отправить email уведомление при открытии урока'
          />
          <Button variant='contained' color='primary' onClick={this.saveData}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateLesson;
