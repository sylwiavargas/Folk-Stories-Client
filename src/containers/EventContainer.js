import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Trail } from "react-spring/renderprops";


class EventContainer extends Component {

  state = {
    queerEvents: false,
    womenEvents: false,
    allEvents: true
  }

  getEvents = () => {
    fetch(`http://localhost:3000/api/v1/events`)
      .then(res => res.json())
      .then(events => this.props.saveEvents(events))
    }

  componentDidMount(){
    this.getEvents();
  }

  handleAll = () => {
    this.getEvents()
    this.setState({
      allEvents: true,
      queerEvents: false,
      womenEvents: false
    })
  }

  handleWomen = () => {
    let womenEvents = [];
    womenEvents = this.props.events.filter((event) => {
      // if event.types includes an object with id = 1
      return event.types.map(typeObj => typeObj.id).includes(1)
    })
    this.setState({
      womenEvents: !this.state.womenEvents,
      allEvents: false
    })
    this.props.selectCategory(womenEvents)
  }

  handleQueer = () => {
    let queerEvents = [];
    queerEvents = this.props.events.filter((event) => {
      return event.types.map(typeObj => typeObj.id).includes(2)
    })
    this.setState({
      queerEvents: !this.state.queerEvents,
      allEvents: false
    })
    this.props.selectCategory(queerEvents)
  }

  render() {
    const evs = this.props.events;
    console.log(this.props.featuredEvents)
    debugger
    return (
      <div>
      <button onClick={() => {this.handleAll()}}> All </button>
      <button onClick={() => {this.handleWomen()}}> Women </button>
      <button onClick={() => {this.handleQueer()}}> Queer </button>
      <ul>
      {this.props.featuredEvents !== undefined ?
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
    events: state.events.events[0],
    user: state.user,
    featuredEvents: []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (events) => {
      dispatch({type: 'SAVE_EVENTS', payload: events})
    },
    selectCategory: (events) => {
      dispatch({type: 'SELECT_CATEGORY', payload: events})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(EventContainer);
