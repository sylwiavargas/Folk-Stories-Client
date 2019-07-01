import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from '../containers/NavBarContainer';
import Loading from './Loading'
import Footer from './Footer'
import { Link } from 'react-router-dom'

class Person extends Component {

    getPeep = () => {
      const num = this.props.match.params.id
      fetch(`http://localhost:3000/api/v1/people/${num}`)
        .then(res => res.json())
        .then(person => this.props.savePerson(person))
    }

    componentDidMount() {
      this.getPeep()
    }

  render() {
    const person = this.props.person.person.person
    console.log(this.props)
    return(
      !person ?
      <div className="App">
        <Loading />
      </div>
      :
      <div className="App">
        <NavBarContainer />
        <div className="main">
          <h1> {person.name} </h1>
          <h2> "{person.quote_eng}" </h2>
          <p> {person.bio_eng} </p>
          <p> <a href = {person.read_more_eng}> Read more about {person.name} </a> </p>
          <h2> See {person.name} events: </h2>
          <ul>
          {
            person.events.map((event, index) => <li key={index}><Link to={`/events/${event.id}`}>{event.year_era_id}: {event.title_eng}</Link>  </li>)
          }
          </ul>
          <img src = {person.picture} alt={person.name}/>
        </div>
        <Footer />
      </div>
    )}
}


const mapStateToProps = state => {
  return {
    person: state.people
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Person);
//
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
