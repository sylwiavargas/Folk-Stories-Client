import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from './NavBarContainer'
const Person = ({ match }) => <p>{match.params.id}</p>


class BioContainer extends Component {

  getPeeps = () => {
    fetch(`http://localhost:3000/api/v1/users`)
      .then(res => res.json())
      .then(people => this.props.savePeople(people))
    }

  render() {
    const { url } = this.props.match
    console.log(this.props)
    return(
      <div>
      <NavBarContainer />
      bio container here
      <p>{url.id}</p>
      <button onClick={this.getPeeps}> Show Peeps </button>
      <ul>
      {this.props.people.length !== 0 ?
        this.props.people.map((person, index) => {
          return <li key={index}> {person.name} </li>
        })
      : null
      }
      </ul>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    people: state.people.people
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePeople: (people) => {
      dispatch({type: 'SAVEPEOPLE', payload: people})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(BioContainer);

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
