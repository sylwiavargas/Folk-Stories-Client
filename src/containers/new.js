import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import BioContainer from './containers/BioContainer'
import LoginForm from './containers/LoginForm'
import UserProfile from './containers/UserProfile'
import Person from './components/Person'
import Event from './components/Event'
import EventsPage from './containers/EventsPage'
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
<Switch>
             <Route path='/home' render={(routerProps) => {
               return <HomePage {...routerProps} />
             }} />
             <Route path='/login' render={(routerProps) => {
               return <LogInForm signIn={this.signIn} {...routerProps} />
             }} />
             <Route path='/signup' render={(routerProps) => {
               return <SignUpForm signIn={this.signIn} {...routerProps} />
             }} />
             <Route path='/campaigns' render={(routerProps) => {
               return <CampaignsHome {...routerProps} />
             }} />
             <Route path='/new-campaign' render={(routerProps) => {
               return <NewCampaignForm {...routerProps} />
             }} />
             <Route path='/characters' render={(routerProps) => {
               return <CharactersHome {...routerProps} />
             }} />
             <Route path='/new-characters' render={(routerProps) => {
               return <NewCharacterForm {...routerProps} />
             }} />
             <Redirect from='/' to='/home' />
           </Switch>

=--------=================


const routing = (
  <Provider store={store}>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/Bios" component={BioContainer} />
        <Route exact path="/Events" component={EventsPage} />
        <Route exact path="/Events/:id" component={Event} />
        <Route path="/Login" component={LoginForm} />
        <Route exact path="/Bios/:id" component={Person} />
        <Route exact path="/you" component={UserProfile} />
        <Route component={Notfound} />
      </ Switch>
    </div>
  </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root')
);
