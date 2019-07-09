
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect} from 'react-redux';

import TodayEventContainer from './TodayEventContainer'; //commented it out to test
import BioContainer from './BioContainer'
import UserProfile from './UserProfile'
import Person from '../components/Person'
import Event from '../components/Event'
import ContributeContainer from './ContributeContainer'
import Notfound from '../components/notfound'
import Loading from '../components/Loading'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import DatesPage from './DatesPage'
// import MapContainer from './MapContainer'

import '../App.css';

const API = "http://localhost:3000/api/v1"


class MainContainer extends Component {


    goBack = () => {
      this.props.history.push('/')
    }

    formInput = (userInput) => {
      let path;
      userInput.user ? path = '/users' : path = "/login";

      fetch(API + `${path}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          const errors = response.errors.split ('')
          alert(errors)
        } else {
          localStorage.setItem("token", response.jwt)
          this.props.login(response.user)
          this.goBack()
        }
      })
    }


  render() {
    return(
      <div className="main">
      {this.props.loadState.loading === true ?
      <Loading />
      :
      <Switch>
      {// <Route exact path="/" component={MapContainer} />
      // <Route exact path="/bios/:id" component={Person} />
      }
      <Route exact path="/" component={DatesPage} />
      <Route path="/(bios|bios/:id)" component={BioContainer} />
      <Route exact path="/contribute" component={ContributeContainer} />
      <Route path="/(dates|dates/:id|dates/:id/:id)/" component={DatesPage} />
      <Route exact path="/events/:id" component={Event} />
      <Route exact path="/you" component={UserProfile} />
      <Route exact path="/signUp" component={SignUpForm} formInput={this.formInput}/>
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
