import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom'
import Person from '../components/Person';
import Force from '../components/Force.js';

class BioContainer extends Component {

  getPeeps = () => {
    fetch(`http://localhost:3000/api/v1/bios`)
      .then(res => res.json())
      .then(people => this.props.savePeople(people))

    }

  render() {
    const path = this.props.match.path
    // console.log(this.props.people)
    return(
      <div className="App">
      {
        path.includes("/:id") ?
        <Person />
        :
        <div className="bio">
        <button onClick={() => {this.getPeeps()}}> Show People </button>
        <ul>
        {this.props.people.length > 0 ?
          this.props.people.map((person, index) => {
            return <li key={index}> <Link to={`/bios/${person.id}`}>{person.name}</Link></li>
          })
        : null
        }
        </ul>
        </div>

      }
      <h1> Here's how they relate: </h1>
      <Force />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    people: state.people.people,
    person: state.people.person
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

// const Person = ({ match }) => <p>{match.params.id}</p>
