import { connect} from 'react-redux';
import React, { Component } from 'react';

const API = "http://localhost:3000/api/v1"

class LoginForm extends Component {

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
      if (response.error){
        const error = response.error
        alert(error)
      } else {
        localStorage.setItem("token", response.jwt)
        this.props.login(response.user)
        this.goBack()
      }
    })
  }

  handleSubmit = (event)=> {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let user = {auth: {username, password}}
    this.formInput(user)
  }

  render() {
    return (
      <div>
      <br/>
      <h1> Log in: </h1>
      <form onSubmit={(event) => this.handleSubmit(event)}>
      <h4> Username: </h4><input placeholder="username" type="username" name="username"/>
      <h4> Password: </h4><input placeholder="password" type="password" name="password"/><br/>
      <br/><button className="notbutton left">Submit</button>
      </form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      dispatch({type: "LOGIN", payload: user})
    },
    autoLogin: (user) => {
      dispatch({type: 'LOG_IN', payload: user})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(LoginForm);
