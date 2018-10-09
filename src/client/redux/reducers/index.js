import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app-reducer';
import coursesReducer from './courses-reducer';
import sectionsReducer from './sections-reducer';

export default combineReducers({
  router: routerReducer,
  app: appReducer,
  courses: coursesReducer,
  sections: sectionsReducer
});
