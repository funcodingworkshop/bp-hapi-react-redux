import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/text-field/text-field';
import fetchCoursesSagaAC from '../../redux/actions/clients-actions';
class Clients extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>Чебурашка</li>
          <li>Крокодил Гена</li>
          <li>Шапокляк</li>
        </ul>
        <TextField />
      </div>
    );
  }
}
export default Clients;
