
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect} from 'react-redux';

// routes:
import EventContainer from './EventContainer';
import BioContainer from './BioContainer'
import UserProfile from './UserProfile'
import Person from '../components/Person'
import Event from '../components/Event'
import EventsPage from './EventsPage'
import Notfound from '../components/notfound'
import Loading from '../components/Loading'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'

import '../App.css';

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
      <Route exact path="/login" component={LoginForm} />
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
