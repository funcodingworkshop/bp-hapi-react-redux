import { createStore } from 'redux';
import reducers from '../client/redux/reducers';

export default function configureStore() {
  return (initState = {}, history = null) => {
    const store = createStore(
      reducers,
      initState
    );
    return store;
  };
}
