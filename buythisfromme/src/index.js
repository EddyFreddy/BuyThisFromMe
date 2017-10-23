import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducers.js';

const store = createStore(
 reducer,
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
