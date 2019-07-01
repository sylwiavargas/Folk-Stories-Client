import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from '../containers/NavBarContainer';
import Loading from './Loading'
import Footer from './Footer'

const API = "http://localhost:3000/api/v1"

class Event extends Component {

    getEvent = () => {
      const num = this.props.match.params.id
      fetch(`http://localhost:3000/api/v1/events/${num}`)
        .then(res => res.json())
        .then(event => this.props.saveEvent(event))
    }

    componentDidMount() {
      this.getEvent()
    }

    handleSubmit = (e)=> {
      e.preventDefault();
      let title_eng = e.target.title_eng.value
      let description_eng = e.target.description_eng.value
      let year = e.target.year.value
      let month = e.target.month.value
      let day = e.target.day.value
      let occurance = {event: {title_eng, description_eng, year, month, day}}
      this.addEvent(occurance)
    }

    addEvent = (userInput) =>{
      fetch(API + `/events`, {
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
    const props = this.props
    console.log(props)
    return(
    <div>
    <form onSubmit={(e) => this.handleSubmit(e)}>
      <input placeholder="Title" type="text" name="title_eng"/>
      <input placeholder="Description" type="text" name="description_eng"/>
      <input placeholder="Year" type="text" name="year"/>
      <input placeholder="Month" type="text" name="month"/>
      <input placeholder="Day" type="text" name="day"/>
      <button>Submit</button>
    </form>
    </div>
    )}
}


const mapStateToProps = state => {
  return {
    event: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvent: (e) => {
      dispatch({type: 'SAVE_EVENT', payload: e})
    },
    addEvent: (e) => {
      dispatch({type: 'ADD_EVENT', payload: e})
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
