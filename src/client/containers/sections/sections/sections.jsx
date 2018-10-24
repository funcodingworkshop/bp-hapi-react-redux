import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SectionsComponent from '../../../components/sections/sections-component/sections-component';

import { doRouteAC } from '../../../redux/actions/router-actions';
import { selectSections } from '../../../redux/selectors/sections-selectors';
import { fetchSectionsSagaAC } from '../../../redux/actions/sections-actions';


import './sections.css';

function mapStateToProps(state) {
  return {
    sectionsList: selectSections(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doRoute: doRouteAC,
    fetchSections: fetchSectionsSagaAC
  }, dispatch);
}

class Sections extends React.Component {
  static propTypes = {
    fetchSections: PropTypes.func.isRequired,
    sectionsList: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    return (
      <div className='sections'>
        <h2>Sections Page</h2>
        <div className="sections__panel">

          <Link to="/sections/add"><Button variant="contained" color="primary">Создать раздел</Button></Link>

          <div className="sections__panel-list">

            <Grid container spacing={8} className="sections__panel-list__header">
              <Grid item xs={1}>id</Grid>
              <Grid item xs={2}>Название раздела</Grid>
              <Grid item xs={1}>Длительность раздела</Grid>
              <Grid item xs={2}>Дата создания</Grid>
              <Grid item xs={3}>Описание</Grid>
              <Grid item xs={3}>ID курса</Grid>
            </Grid>

           {this.props.sectionsList.map((section, index) =>
              <div className="sections-line" key={`line${index}`}>
                <SectionsComponent
                  key={`section${index}`}
                  viewId={index + 1}
                  section={section}
                />
              </div>)
            }

          </div>
        </div>
      </div>
    );
  }
}

const VisibleSections = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sections);

export default VisibleSections;

