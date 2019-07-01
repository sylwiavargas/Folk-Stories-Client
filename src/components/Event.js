import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from '../containers/NavBarContainer';
import Footer from './Footer'
import { Link } from 'react-router-dom';

const API = "http://localhost:3000/api/v1/events"

class Event extends Component {

    getEvent = () => {
      const num = this.props.match.params.id
      fetch(API + `/${num}`)
        .then(res => res.json())
        .then(e => this.props.saveEvents(e))
    }

    componentDidMount(){
      this.getEvent()
    }

  render() {
    console.log(this.props)
    return(
      <div className="App">
      <NavBarContainer />
      <div className="main">
      <ul>
      {this.props.events !== undefined ?
        this.props.events.map((event, index) => {
          return <li key={index}>
          <h2> {event.event.month_id}/{event.event.day_id}/{event.event.year_era_id}: {event.event.title_eng}</h2>
          <p> {event.event.description_eng} </p>
          <a href={event.event.read_more_eng}> Read more </a>
          {event.event.people ?
          <p> <strong> Related people: </strong>  {event.event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name}</Link>})}
          </p> : null}
          </li>
        })
      : null
      }
      </ul>
    </div>
    <Footer />
    </div>
    )}
}


const mapStateToProps = state => {
  return {
    events: state.events.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (e) => {
      dispatch({type: 'SAVE_EVENTS', payload: e})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Event);
//
// nested routing: https://codeburst.io/getting-started-with-react-router-5c978f70df91
//
// !event ?
// <div className="App">
//   <Loading />
// </div>
// :
// <div className="App">
//   <NavBarContainer />
//   <div className="main">
//     <h1> {event.title_eng} </h1>
//     <h2> See people related to this event: </h2>
//     <ul>
//     {
//       event.people.map((person, index) => <li key={index}> {person.name_eng} </li>)
//     }
//     </ul>
//   </div>
//   <Footer />
// </div>
