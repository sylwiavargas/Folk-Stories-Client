import React, { Component } from 'react';
import { connect} from 'react-redux';
// import { Link } from 'react-router-dom';

const API = "http://localhost:3000/api/v1/events"
const API2 = "http://localhost:3000/api/v1/bios"

class ContributeContainer extends Component {

  handleSubmitEvent = (e)=> {
    e.preventDefault();
    let title_eng = e.target.title_eng.value
    let description_eng = e.target.description_eng.value
    let mmddyyy = e.target.mmddyyy.value
    let occurance = {event: {title_eng, description_eng, mmddyyy}}
    this.addEvent(occurance)
  }

  handleSubmitPeep = (e)=> {
    e.preventDefault();
    let name = e.target.name.value
    let birth = e.target.birth.value
    let death = e.target.death.value
    let bio_eng = e.target.bio_eng.value
    let peep = {person: {name, birth, death, bio_eng}}
    this.addPeep(peep)
  }

  addEvent = (userInput) =>{
    fetch(API , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
      })
    .then(res => res.json())
    .then(event => this.props.addEvent(event))
  }

  addPeep = (userInput) =>{
    fetch(API2 , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
      })
    .then(res => res.json())
    .then(peep => this.props.addPeep(peep))
  }


  render() {
    return (
      <div className="formtable">
        <div class="column teal">
          <h1> Add a new event: </h1>
          <form onSubmit={(e) => this.handleSubmitEvent(e)}>
            <input placeholder="Title" type="text" name="title_eng" className="bold"/><br/><br/>
            <input className="textarea"  placeholder="Description" type="textarea" name="description_eng"/><br/><br/>
            <input placeholder="Date (MMDDYYY)" type="text" name="mmddyyy"/><br/> <br/><br/>
            <button className="notbutton left">Submit</button>
          </form>
        </div>
        <div class="column yellow">
          <h1> Add a new bio: </h1>
          <form onSubmit={(e) => this.handleSubmitPeep(e)}>
            <input placeholder="Name" type="text" name="name" className="bold"/><br/><br/>
            <input placeholder="Bio" type="textarea" name="bio_eng" className="textarea"/><br/><br/>
            <input placeholder="Year of birth" type="text" name="birth"/><br/><br/>
            <input placeholder="Year of death" type="text" name="death"/><br/><br/> <br/>
            <button className="notbutton left">Submit</button>
          </form>
        </div>
      </div>
    )}

  }
      // <ul>
      // <h1> Today's events: </h1>
      // {this.props.events !== undefined && this.props.events > 0  ?
      //   this.props.events.map((event, index) => {
      //     return <li key={index}>
      //     <h2> {event.title_eng} </h2>
      //     <p> {event.description_eng} </p>
      //     <a href={event.read_more_eng} target="_blank" rel="noopener noreferrer"> Read more </a>
      //     {event.people ?
      //     <p> <strong> Related people: </strong>  {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})}
      //     </p> : null}
      //     </li>
      //   })
      // : null
      // }
      // </ul>


const mapStateToProps = state => {
  return {
    events: state.events.events[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (events) => {
      dispatch({type: 'SAVE_EVENTS', payload: events})
    },
    addEvent: (e) => {
      dispatch({type: 'ADD_EVENT', payload: e})
    },
    addPeep: (p) => {
      dispatch({type: 'ADD_PERSON', payload: p})
    }

  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(ContributeContainer);
