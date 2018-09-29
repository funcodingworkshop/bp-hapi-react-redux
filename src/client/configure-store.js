import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './redux/reducers/index';
import rootSaga from './redux/sagas/index';

const composeEnhancers = composeWithDevTools({});

export default function configureStore() {
  return (initState = {}, history = null) => {
    const middleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      reducers,
      initState,
      composeEnhancers(applyMiddleware(
        middleware,
        sagaMiddleware
      ))
    );
    sagaMiddleware.run(rootSaga);
    return store;
  };
}
