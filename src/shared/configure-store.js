import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../client/redux/reducers';

const composeEnhancers = composeWithDevTools({});

export default function configureStore() {
  return (initState = {}, history = null) => {
    const middleware = routerMiddleware(history);
    const store = createStore(
      reducers,
      initState,
      composeEnhancers(applyMiddleware(middleware))
    );
    return store;
  };
}
