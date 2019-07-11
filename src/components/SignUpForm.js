import React from 'react'

const API = "http://localhost:3000/api/v1"

class SignupForm extends React.Component {

  goBack = () => {
    this.props.history.push('/')
  }

  formInput = (userInput) => {
    let path = '/users';

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
        this.props.history.push('/')
      }
    })
  }

  handleSubmit = (event)=> {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let password_confirmation = event.target.password_confirmation.value
    let zip = event.target.zip.value
    let name = event.target.name.value
    let email = event.target.email.value
    let user = {user: {username, password, password_confirmation, zip, name, email}}
    this.formInput(user)
  }

  render() {
    return (
      <div>
      <h1> Sign up: </h1>
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <h4> Username: </h4> <input placeholder="username" type="username" name="username"/>
        <h4> Name: </h4> <input placeholder="name" type="text" name="name"/>
        <h4> Password: </h4> <input placeholder="password" type="password" name="password"/>
        <h4> Again, password: </h4><input placeholder="password confirmation" type="password" name="password_confirmation"/>
        <h4> Your zipcode: </h4><input placeholder="zip" type="text" name="zip"/>
        <h4> Email: </h4><input placeholder="email" type="email" name="email"/> <br/>
        <br/> <button className="notbutton left">Submit</button>
      </form>
      </div>
    )
  }

}

export default SignupForm
