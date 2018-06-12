import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configure-store';
import Root from './root';

// TODO HOT_LOADER
const configureStoreLocal = configureStore();
// TODO pass state for SSR
const store = configureStoreLocal();

ReactDOM.render(<Root store={ store } />, document.getElementById('react-app'));
