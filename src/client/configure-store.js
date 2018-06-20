import { createStore } from 'redux';

import reducers from './reducers';

export default function configureStore(isHotLoaderRequired = false) {
  return (initState = {}) => {
    console.log('isHotLoaderRequired', isHotLoaderRequired);
    return createStore(reducers, initState);
  };
}
