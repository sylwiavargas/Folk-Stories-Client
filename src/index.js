import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';
import './index.css';
import App from './containers/App';

const store = createStore(rootReducer(),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const routing = (
  <Provider store={store}>
  <BrowserRouter>
        <Route component={App} />
  </BrowserRouter>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root')
);
