import React from 'react'

class SignupForm extends React.Component {

  handleSubmit = (event)=> {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let password_confirmation = event.target.password_confirmation.value
    let zip = event.target.zip.value
    let name = event.target.name.value
    let email = event.target.email.value
    let user = {user: {username, password, password_confirmation, zip, name, email}}
    this.props.userAccess(user)
  }

  render() {
    return (
      <div>
      <br/>
      "SIGNUP"
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input placeholder="username" type="username" name="username"/>
        <input placeholder="name" type="text" name="name"/>
        <input placeholder="password" type="password" name="password"/>
        <input placeholder="password confirmation" type="password" name="password_confirmation"/>
        <input placeholder="zip" type="text" name="zip"/>
        <input placeholder="email" type="email" name="email"/>
        <button>Submit</button>
      </form>
      </div>
    )
  }

}

export default SignupForm
