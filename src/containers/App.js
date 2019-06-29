import React, { Component } from 'react';
import { connect} from 'react-redux';
import MainContainer from './MainContainer'
import BioContainer from './BioContainer'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const API = "http://localhost:3000/api/v1"

class App extends Component {

    goBack = () => {
      this.props.history.push('/')
    }

    userAccess = (userInput) => {
      let path;
      userInput.user ? path = '/users' : path = "/login";

    fetch(`${API}` + `${path}`, {
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

  componentDidMount(){
    this.props.loading();
  }

  render() {
    return (
      <div className="App">
      {this.props.loadState.loading === true ?
      "I am loading"
      :
      <MainContainer/>}
      <LoginForm userAccess={this.userAccess}/>
      <SignUpForm userAccess={this.userAccess}/>
    </div>
    );
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
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(App);
