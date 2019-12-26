import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './component/App';
import Store from './store/index';
import * as serviceWorker from './serviceWorker';
// import App2 from './setupTests';

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
