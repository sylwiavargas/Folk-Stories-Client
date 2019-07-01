import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from './NavBarContainer';
import Footer from '../components/Footer'

class UserProfile extends Component {

  updateProfile = (userInput) =>{
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
      })
    .then(res => res.json())
    .then(user => console.log(user))
  }

  render() {
    console.log(this.props.user)
    return (
      <div className="main">
      <h1> This is you: </h1>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" name="name" value={this.props.user.name} />
        <input type="text" name="email" value={this.props.user.email} />
        <input type="text" name="zip" value={this.props.user.zip} />
        <button>Submit</button>
      </form>
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
    savePeople: (people) => {
      dispatch({type: 'SAVE_PEOPLE', payload: people})
    },
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(UserProfile);

// nested routing: https://codeburst.io/getting-started-with-react-router-5c978f70df91
//
// <div>
//   <h1>Users</h1>
//   <strong>select a person</strong>
//   <ul>
//     <li>
//       <Link to="/users/1">User 1 </Link>
//     </li>
//     <li>
//       <Link to="/users/2">User 2 </Link>
//     </li>
//     <li>
//       <Link to="/users/3">User 3 </Link>
//     </li>
//   </ul>
//   <Route path="/users/:id" component={User} />
// </div>

// const Person = ({ match }) => <p>{match.params.id}</p>
