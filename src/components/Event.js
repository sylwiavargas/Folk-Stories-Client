import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from '../containers/NavBarContainer';
import Loading from './Loading'
import Footer from './Footer'

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
    console.log(this.props)
    return(
      <div className="App">
      <NavBarContainer />
      <div className="main">
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input placeholder="Title" type="text" name="title_eng"/>
        <input placeholder="Description" type="text" name="description_eng"/>
        <input placeholder="Date (MMDDYYY)" type="text" name="mmddyyy"/>
        <button>Submit</button>
      </form>
    </div>
    <Footer />
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
    saveEvents: (e) => {
      dispatch({type: 'SAVE_EVENTS', payload: e})
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
