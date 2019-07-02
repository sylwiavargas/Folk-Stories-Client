import React, { Component, Fragment } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Trail } from "react-spring/renderprops";


class EventContainer extends Component {

  state = {
    queer: false,
    women: false,
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
    const featuredEvents = []
    this.getEvents()
    this.setState({
      allEvents: true,
      queer: false,
      women: false
    })
    this.props.selectAll(featuredEvents)
  }

  handleWomen = () => {
    let womenEvents = [];
    womenEvents = this.props.events.filter((event) => {
      // if event.types includes an object with id = 1
      return event.types.map(typeObj => typeObj.id).includes(1)
    })
    if (this.state.women === false) {
      womenEvents.forEach((e) => this.props.selectCategory(e))
      this.setState({
        women: true,
        allEvents: false
      })
    } else {
    this.setState({
      women: false
    })
    let newE = this.props.featuredEvents.filter((e) => !womenEvents.includes(e))
    this.props.deleteCategory(newE)
  }}

  handleQueer = () => {
    let queerEvents = [];
    queerEvents = this.props.events.filter((event) => {
      return event.types.map(typeObj => typeObj.id).includes(2)
    })
    if (this.state.queer === false) {
      queerEvents.forEach((e) => this.props.selectCategory(e))
      this.setState({
        queer: true,
        allEvents: false
      })
    } else {
    this.setState({
      queer: false
    })
    let newE = this.props.featuredEvents.filter((e) => !queerEvents.includes(e))
    this.props.deleteCategory(newE)
  }}

  render() {
    const evs = this.props.events;
    const efs = this.props.featuredEvents;
    const userTypes = this.props.user.currentUser.types.map((type) => type.name_eng);
    console.log(this.props)
    return (
      <div>
      <button onClick={() => {this.handleAll()}}> All </button>
      <button onClick={() => {this.handleWomen()}}> Women </button>
      <button onClick={() => {this.handleQueer()}}> Queer </button>
      <ul>
      {efs && efs.length > 0 ?
        efs.map((event, index) =>
          <Fragment key={index}>
           <h2> {event.year_era_id}: {event.title_eng} </h2>
           {event.types.map((type) => <p key={type.id}><strong>Event category:</strong> {type.name_eng.toLowerCase()}</p>)}
           <p> {event.description_eng} </p>
           <a href={event.read_more_eng.toString()}> Read more </a>
           <p> <strong> Related people: </strong> {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})} </p>
           </Fragment>
         )
        : this.props.events !== undefined ?
          <Trail
           items={evs}
           keys={event => event.id}
           from={{ marginLeft: -20, opacity: 0 }}
           to={{ marginLeft: 20, opacity: 1 }}
         >
           {event => props => (
             <div style={props}>
             <h2> {event.year_era_id}: {event.title_eng} </h2>
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
    featuredEvents: state.events.featuredEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (events) => {
      dispatch({type: 'SAVE_EVENTS', payload: events})
    },
    selectCategory: (events) => {
      dispatch({type: 'SELECT_CATEGORY', payload: events})
    },
    deleteCategory: (events) => {
      dispatch({type: 'DELETE_CATEGORY', payload: events})
    },
    selectAll: (events) => {
      dispatch({type: 'SELECT_ALL', payload: events})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(EventContainer);
