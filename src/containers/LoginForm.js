import React from 'react'


class LoginForm extends React.Component {

  handleSubmit = (event)=> {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let user = {auth: {username, password}}

    this.props.userAccess(user)
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
export default LoginForm
