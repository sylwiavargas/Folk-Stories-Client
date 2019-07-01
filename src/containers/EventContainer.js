import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Trail } from "react-spring/renderprops";


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
    const evs = this.props.events;
    // console.log(evs)
    return (
      <div>
      <ul>
      {this.props.events !== undefined ?
          <Trail
           items={evs}
           keys={event => event.id}
           from={{ marginLeft: -20, opacity: 0 }}
           to={{ marginLeft: 20, opacity: 1 }}
         >
           {event => props => (
             <div style={props}>
             <h2> {event.title_eng} </h2>
             {event.types.map((type) => <p key={type.id}><strong>Event category:</strong> {type.name_eng.toLowerCase()}</p>)}
             <p> {event.description_eng} </p>
             <a href={event.read_more_eng.toString()}> Read more </a>
             <p> <strong> Related people: </strong> {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})} </p>
             </div>

           )}
         </Trail>
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
