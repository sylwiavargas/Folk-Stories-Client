import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';


class EventContainer extends Component {

  getEvents = () => {
    fetch(`http://localhost:3000/api/v1/events`)
      .then(res => res.json())
      .then(events => this.props.saveEvents(events))
    }

  componentDidMount(){
    this.getEvents();
  }

  render() {
    return (
      <div>
      <ul>
      {this.props.events.length !== 0 ?
        this.props.events.events.map((event, index) => {
          return <li key={index}>
          <h2> {event.title_eng} </h2>
          <p> {event.description_eng} </p>
          <a href={event.read_more_eng.toString()}> Read more </a>
          <p> <strong> Related people: </strong> {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})} </p>
          </li>
        })
      : null
      }
      </ul>
      </div>
  )}

}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (events) => {
      dispatch({type: 'SAVE_EVENTS', payload: events})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(EventContainer);
