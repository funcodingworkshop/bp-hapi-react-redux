import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app-reducer';
import coursesReducer from './courses-reducer';
import clientsReducer from './clients-reducer';

export default combineReducers({
  settings: (state = null) => state,
  router: routerReducer,
  app: appReducer,
  courses: coursesReducer,
  clients: clientsReducer
});
