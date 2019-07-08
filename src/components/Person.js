import React, { Component } from 'react';
import { connect} from 'react-redux';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';

class Person extends Component {

  getPeep = () => {
    const num = this.props.match.params.id
    fetch(`http://localhost:3000/api/v1/bios/${num}`)
      .then(res => res.json())
      .then(person => this.props.savePerson(person))
  }

  componentDidMount() {
    this.getPeep()
  }

  render() {
    const person = this.props.person.person.person
    let first_name;

    if (person) {
      first_name = person.name.split(" ")[0]
      // console.log("first name")
    }

    return(
      !person ?
      <div className="App">
        <Loading />
      </div>
      :
        <div>
        <div className="bio">
          <div className="column" style={{"marginRight": "20em"}}>
            <div className="image-cropper">
              <img src = {person.picture} alt={person.name}/>
            </div>

          </div>
          <div className="column">

          </div>
          <div className="column">
            <h1> {person.name} </h1>
            {person.quote_eng === " " ?
            null :
            <h2> "{person.quote_eng}" </h2>}
            <p> {person.bio_eng} </p>
            <p> Read more about {person.name} at <a href = {person.read_more_eng} target="_blank" rel="noopener noreferrer"> { person.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]} </a> </p>
            <h2> Visit {first_name}'s places: </h2>
            <ul>
            {
              person.places.map((place, index) => <li key={index}>{place.name_eng}</li>)
            }
            </ul>

            <h2> See {first_name}'s events: </h2>
            <ul>
            {
              person.events.map((event, index) => <li key={index}>{event.year_era_id}: <Link to={`/events/${event.id}`}> {event.title_eng}</Link>  </li>)
            }
            </ul>
          </div>
          <div className="column">
          <br/>
          <h2> Tell your friends about {first_name}: </h2>
          <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
           <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
          </div>
        </div>
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
