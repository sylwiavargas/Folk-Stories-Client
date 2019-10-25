import React, { Component } from 'react';
import { connect} from 'react-redux';

class UserProfile extends Component {

  goBack = () => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  state={
    id: this.props.id,
    username: this.props.username,
    name: this.props.user.name,
    email: this.props.user.email,
    zip: this.props.user.zip,
    change: false,
  }

  formInput = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitEvent = event => {
    event.preventDefault()
    this.updateProfile({
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        zip: this.state.zip
    })
    this.setState({
      change: true})
  }

  updateProfile = (user) =>{
    // console.log("in updateProfile", this.props)
    const token = localStorage.getItem("token")
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({user})
      })
    .then(res => res.json())
    // .then(user => console.log(user))
  }

  deleteProfile = () =>{
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({id: id})
      })
      .then(res => res.text())
      .then(this.goBack())
    }

  render() {
   return (
      <div className="main">
        <div>
          {this.state.change === true ?
            <div> <h1> Thank you! Our admins will add yoursuggestion! </h1> </div>
          :
           null
          }
        </div>
        <div className="formtable ">
          <div class="column teal ">
            <h1> Wanna edit your profile? </h1>
            <form onSubmit={(e) => this.submitEvent(e)}>
              <input onChange={this.formInput} type="text" name="name" value={this.state.name} />
              <input onChange={this.formInput} type="text" name="email" value={this.state.email} />
              <input onChange={this.formInput} type="text" name="zip" value={this.state.zip} /><br/><br/>
              <button className="notbutton center">Submit</button>
            </form>
          </div>
          <div className="column yellow middle">
            <h1> Fed up with us already? </h1>
            <button className="notbutton center delete" onClick={() => this.deleteProfile()}> DELETE YOUR PROFILE</button>
          </div>
        </div>
      </div>
  )}

}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(UserProfile);
