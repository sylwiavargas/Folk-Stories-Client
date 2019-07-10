import React, { Component } from 'react';
import { connect} from 'react-redux';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';
import Popup from "reactjs-popup";
import Event from './Event';
import Force from './Force';

class Person extends Component {

  state = {
    loading: true,
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  getPeep = () => {
    const num = this.props.match.params.id
    fetch(`http://localhost:3000/api/v1/bios/${num}`)
      .then(res => res.json())
      .then(person => this.props.savePeep(person))
  }

  componentDidMount() {
    this.getPeep()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.getPeep()
    }
  }

  render() {
    const person = this.props.peep.person
    let first_name;

    if (person) {
      first_name = person.name.split(" ")[0]
      console.log(person.pps)
    }

    const backgrounds = ["gradient-five", "gradient-four", "gradient-three", "gradient-two", "gradient-one"]
    const pickOne = () => backgrounds[Math.floor(Math.random()*backgrounds.length)]

    const backgroundsChanging = ["gradient-five-mouseon", "gradient-four-mouseon", "gradient-three-mouseon", "gradient-two-mouseon", "gradient-one-mouseon"]
    const pickTwo = () => backgroundsChanging[Math.floor(Math.random()*backgrounds.length)]

    return(
      !person ?
      <div className="App">
        <Loading />
      </div>
      :
        <div>
        <div className="bio-fake">
          <div className="column">
            <h1> {person.name} </h1>
            {person.quote_eng === " " ?
            null
             :
            <h2> "{person.quote_eng}" </h2>}
            <p> {person.bio_eng} </p>
            <p> Read more about {person.name} at <a href = {person.read_more_eng} target="_blank" rel="noopener noreferrer"> { person.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]} </a> </p>
            <h2> Visit {first_name}'s places: </h2>
            { person.pps && person.pps.length > 0 ?
              person.pps.map((pp, index) => <li key={index} style={{"list-style-type": "square"}}><strong>{pp.place.name_eng}:</strong> {pp.description_eng}<br/><br/></li>)
              :
              <div>
              <p> No places yet!
              <Link to={`/contribute`} style={{"color": "#2376ae"}}><strong> Please contribute.</strong></Link></p>
              </div>
            }
            <h2> See {first_name}'s events: </h2>
            { person.events && person.events.length > 0 ?
                person.events.map((event, index) => <li key={index}>
                <Popup
                  trigger={ <button className={` notbutton ${pickOne()} ${pickTwo()}`}> {event.year_era_id}: {event.title_eng} </button>}
                  position="top center">
                    { close =>(
                    <div className="modal-card">
                      <Event eventId={event.id} close={close}/>
                    </div>)}
                </Popup>
                  <br/><br/><br/></li>)
              :
              <div>
              <p> No events relating to {first_name} yet.
              <Link to={`/contribute`} style={{"color": "#2376ae"}}><strong> Please contribute.</strong></Link></p>
              </div>
            }
          </div>
          <div className="column">

          </div>
          <div className="column">
            <div className="image-cropper">
              <img src = {person.picture} alt={person.name}/>
            </div>
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

// <>
// <h1> Check out other folks: </h1>
// <div className="footer-bio force">
//   <Force/>
// </div>
// </>

const mapStateToProps = state => {
  return {
    person: state.people.person,
    peep: state.people.peep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    },
    savePeep: (person) => {
      dispatch({type: 'SAVE_PEEP', payload: person})
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
