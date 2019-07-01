import { connect} from 'react-redux';
import React, { Component } from 'react';

class LoginForm extends Component {

  handleSubmit = (event)=> {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let user = {auth: {username, password}}
    this.props.formInput(user)
  }

  render() {
    return (
      <div>
      <br/>
      "LOGIN"
      <form onSubmit={(event) => this.handleSubmit(event)}>
      <input placeholder="username" type="username" name="username"/>
      <input placeholder="password" type="password" name="password"/>
        <button>Submit</button>
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
