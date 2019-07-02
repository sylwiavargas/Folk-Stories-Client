
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { Spring,config } from 'react-spring/renderprops';
import moment from 'moment';

// routes:
import EventContainer from './EventContainer';
import BioContainer from './BioContainer'
import UserProfile from './UserProfile'
import Person from '../components/Person'
import Event from '../components/Event'
import EventsPage from './EventsPage'
import Notfound from '../components/notfound'
import Loading from '../components/Loading'
import SignUpForm from './SignUpForm'

import '../App.css';

const API = "http://localhost:3000/api/v1"

class MainContainer extends Component {

  render() {
    return(
      <div className="main">
      {this.props.loadState.loading === true ?
      <Loading />
      :
      <Switch>
      <Route exact path="/" component={EventContainer} />
      <Route exact path="/bios" component={BioContainer} />
      <Route exact path="/events" component={EventsPage} />
      <Route exact path="/events/:id" component={Event} />
      <Route exact path="/bios/:id" component={Person} />
      <Route exact path="/you" component={UserProfile} />
      <Route exact path="/signUp" component={SignUpForm} />
      <Route component={Notfound} />
           </Switch>
      }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.loading,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: () => {
      dispatch({type: 'LOADING'})
    },
    login: (user) => {
      dispatch({type: "LOGIN", payload: user})
    },
    autoLogin: (user) => {
      dispatch({type: 'LOGIN', payload: user})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(MainContainer);
