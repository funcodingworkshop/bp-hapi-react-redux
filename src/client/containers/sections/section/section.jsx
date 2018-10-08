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

import { fetchSectionSagaAC, deleteSectionAC } from '../../../redux/actions/sections-actions';
import { selectCurrentSection } from '../../../redux/selectors/sections-selectors';

import './section.css';

library.add(faTrashAlt, faPencilAlt);

// TODO use decorators
function mapStateToProps(state) {
  return {
    currentSection: selectCurrentSection(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteSection: deleteSectionAC,
    fetchSection: fetchSectionSagaAC
  }, dispatch);
}

class SectionSimpleComponent extends Component {
  static propTypes = {
    currentSection: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    deleteSection: PropTypes.func.isRequired,
    fetchSection: PropTypes.func.isRequired
  };

  handleDelete = () => {
    this.props.deleteSection(this.props.currentSection._id);
    this.setState({ redirect: true });
  };

  constructor(props) {
    super(props);
    this.state = {
      section: null,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.fetchSection(this.props.match.params.id);
  }

  render() {
    const link = this.props.match.params.id;
    return (
      <div>

        <Link to="/sections"><Button className="section__btn-set_main" variant="outlined" color="primary"><span>Список курсов</span></Button></Link>
          <div className="right">

            <Link to={`/sections/${link}/edit`} className="section__btn-set" data-toogle="tooltip" title="Редактировать">
              <Button variant="contained" color="primary">
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
            </Link>

            <Button className="section__btn-set" variant="contained" color="secondary" onClick={this.handleDelete} data-toogle="tooltip" title="Удалить">
              <FontAwesomeIcon icon="trash-alt" />
            </Button>
          </div>

         {this.props.currentSection.name !== undefined ?

           <Grid container className="section">
             <Grid item xs={12} sm={6} md={4} lg={3}>
               <div className="section__card section__card_left">
                 <div className="card__header">Название курса</div>
                 <div>{this.props.currentSection.name}</div>
               </div>
             </Grid>

             <Grid item xs={12} sm={6} md={4} lg={3}>
               <div className="section__card section__card_right">
                 <div className="card__header">Описание курса</div>
                 <div>{this.props.currentSection.comment}</div>
               </div>
             </Grid>

             <Link to={`/sections/${link}/lessons/new`}>
               <Button variant="contained" color="primary">
                 Добавить урок
               </Button>
             </Link>
           </Grid>

        : <div>Loading...</div>
        }

        {this.state.redirect ?
          <Redirect to="/sections" />
        : null }

      </div>);
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionSimpleComponent);
