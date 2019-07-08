import React, { Component, Fragment } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Trail } from "react-spring/renderprops";
import {Spring,config} from 'react-spring/renderprops'
import moment from 'moment';
// import psl from 'psl';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';

class TodayEventContainer extends Component {

  state = {
    queer: false,
    women: false,
    allEvents: true,
    // userEvents: []
  }

  getEvents = () => {
    const today = moment().format('MD')
    const datesapi = `http://localhost:3000/api/v1/dates/${today}`
    fetch(datesapi)
    // fetch(`http://localhost:3000/api/v1/events`)
      .then(res => res.json())
      .then(events => {
        this.props.saveEvents(events)
        // this.handleUserTypes(events)
      })
      // .then(console.log("fetch done"))
      // .then(this.handleUserTypes())
    // debugger
    }

  componentDidMount(){
    this.getEvents();
    // this.handleUserTypes()
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
      // console.log(event.event.types)
      // if event.types includes an object with id = 1
      return event.event.types.map(typeObj => typeObj.id).includes(1)
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
    // debugger
    let queerEvents = [];
      queerEvents = this.props.events.filter((event) => {
      return event.event.types.map(typeObj => typeObj.id).includes(2)
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

  handleUserTypes = (events) => {
    const userTypes = this.props.user.currentUser.types;
    // let userEvents = [];

    userTypes.forEach((type) => {
         type.name_eng === "Women" ?
            this.handleWomen()
          : type.name_eng === "Queer" ?
            this.handleQueer()
          :
            this.handleAll()
          }
      )
    }


  render() {
    const evs = this.props.events;
    const efs = this.props.featuredEvents;

    // console.log("State", this.state)
    // console.log("USER TYPES", this.props.user.currentUser.types)

    // if (evs) {
    //   // console.log(this.props.events[0].event)
    //   console.log(this.props.events)
    // }

    return (
      <div>
      <div>
      <Spring config={config.default}
        from={{ opacity: 0.6, marginLeft: -10 }}
        to={{ opacity: 1, marginLeft: 50 }}
        >
        {props => (
          <div style={props}>
              <h1>{moment().format('MMMM Do YYYY')} || Happened today:</h1>
          </div>
        )}
      </Spring>
      <button onClick={this.handleAll} className="notbutton left"> All </button>
      <button onClick={this.handleWomen} className="notbutton left"> Women </button>
      <button onClick={this.handleQueer} className="notbutton left"> Queer </button>
      </div><br/><br/><br/>
      <ul>
      {efs && efs.length > 0 ?
        efs.map((event, index) =>
          <Fragment key={index}>
           <h2> {event.event.year_era_id}: {event.event.title_eng} </h2>
           {event.event.types.map((type) => <p key={type.id}><strong>Event category:</strong> {type.name_eng.toLowerCase()}</p>)}
           <p> {event.event.description_eng} </p>
           <p> Read more about this event at <a href={event.event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
             </a> </p>
           <p> <strong> Related people: </strong> {event.event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name} </Link>})} </p>
           <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
            <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
           </Fragment>
         )
        : evs !== undefined && evs.length > 0 ?
          <Trail
           items={evs}
           keys={event => event.event.id}
           from={{ marginLeft: -20, opacity: 0 }}
           to={{ marginLeft: 20, opacity: 1 }}
         >
           {e => props => (
             <div style={props}>
             <h2> {e.event.year_era_id}: {e.event.title_eng} </h2>
             <p> {e.event.description_eng} </p>
             <p> Read more about this event at <a href={e.event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { e.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
               </a> </p>
             <p> <strong> Related people: </strong> {e.event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name} </Link>})} </p>
             <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
              <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
             </div>
           )}
         </Trail>
      : null
      }
      </ul>
      </div>
  )}

}

// DELETED now
// handleUserTypes = () => {
//   const userTypes = this.props.user.currentUser.types;
//   return (this.props.events !== undefined && this.props.events.length > 0 ?
//     userTypes.forEach(
//       (type) => {
//        return (type.name_eng === "Women" ?
//           this.handleWomen()
//         : type.name_eng === "Queer" ?
//           console.log(this)
//           // this.handleQueer()
//
//         :
//           console.log("nothing has been done"))
//         }
//     )
//   : null)
//   }


// {event.types.map((type) => <p key={type.id}><strong>Event category:</strong> {type.name_eng.toLowerCase()}</p>)}
//
// <a href={event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> Read more </a>

// <p> <strong> Related people: </strong> {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})} </p>
// <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
// <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
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
  mapStateToProps, mapDispatchToProps)(TodayEventContainer);
