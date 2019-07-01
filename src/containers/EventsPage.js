import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';

const API = "http://localhost:3000/api/v1/events"

class EventContainer extends Component {

  getEvents = () => {
    fetch(`http://localhost:3000/api/v1/events`)
      .then(res => res.json())
      .then(events => this.props.saveEvents(events))
    }

  componentDidMount(){
    this.getEvents();
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    let title_eng = e.target.title_eng.value
    let description_eng = e.target.description_eng.value
    let mmddyyy = e.target.mmddyyy.value
    let occurance = {event: {title_eng, description_eng, mmddyyy}}
    this.addEvent(occurance)
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


  render() {
    console.log(this.props.events)
    return (
      <div>
      <ul>
      {this.props.events !== undefined ?
        this.props.events.map((event, index) => {
          return <li key={index}>
          <h2> {event.title_eng} </h2>
          <p> {event.description_eng} </p>
          <a href={event.read_more_eng}> Read more </a>
          {event.people ?
          <p> <strong> Related people: </strong>  {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})}
          </p> : null}
          </li>
        })
      : null
      }
      </ul>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input placeholder="Title" type="text" name="title_eng"/>
        <input placeholder="Description" type="text" name="description_eng"/>
        <input placeholder="Date (MMDDYYY)" type="text" name="mmddyyy"/>
        <button>Submit</button>
      </form>
      </div>
  )}

}

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
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(EventContainer);
