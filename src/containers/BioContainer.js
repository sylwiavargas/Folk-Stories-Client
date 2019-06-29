import React, { Component } from 'react';
import NavBarContainer from './NavBarContainer'
const Person = ({ match }) => <p>{match.params.id}</p>


class BioContainer extends Component {

  render() {
    const { url } = this.props.match
    console.log(this.props)
    return(
      <div>
      <NavBarContainer />
      bio container here
      <p>{url.id}</p>
      </div>
    )
  }

}

export default BioContainer;

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
