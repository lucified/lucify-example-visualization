import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import configureStore from './configure-store';
import { initialState } from './reducers';

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content'),
);
