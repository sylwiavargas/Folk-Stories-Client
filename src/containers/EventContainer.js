import React, { Component } from 'react';
import { connect} from 'react-redux';

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
          return <li key={index}> {event.title_eng} </li>
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
