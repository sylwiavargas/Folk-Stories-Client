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
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(EventContainer);
