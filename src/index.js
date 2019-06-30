import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './index.css';
import App from './containers/App';
import BioContainer from './containers/BioContainer'
import LoginForm from './containers/LoginForm'
import Notfound from './components/notfound'

// import thunk from 'redux-thunk'
// import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer(),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middleware = [thunk]
// const store = createStore(
//   rootReducer, composeEnhancers(
//     applyMiddleware(...middleware)
//   ));


const routing = (
  <Provider store={store}>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Bios" component={BioContainer} />
        <Route path="/Login" component={LoginForm} />
        <Route exact path="/Bios/:id" component={BioContainer} />
        <Route component={Notfound} />
      </ Switch>
    </div>
  </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root')
);
