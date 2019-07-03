import React, { Component } from 'react';
import { connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

const API = "http://localhost:3000/api/v1/dates"

class Calendar extends Component {

  getDates = () => {
    fetch(API)
      .then(res => res.json())
      .then(e => this.props.saveDates(e))
  }

  componentDidMount(){
    this.getDates()
  }

  render() {
    console.log("PROPS", this.props.dates)
    return(
      <div className="main">
      <h1> July </h1>
      <NavLink to={`/dates/71`}> 1 </NavLink><br/>
      <NavLink to={`/dates/72`}> 2 </NavLink><br/>
      <NavLink to={`/dates/73`}> 3 </NavLink><br/>
      <NavLink to={`/dates/74`}> 4 </NavLink><br/>
      <NavLink to={`/dates/75`}> 5 </NavLink><br/>
      <NavLink to={`/dates/76`}> 6 </NavLink><br/>
      <NavLink to={`/dates/77`}> 7 </NavLink><br/>
      <NavLink to={`/dates/78`}> 8 </NavLink><br/>
      <NavLink to={`/dates/79`}> 9 </NavLink><br/>
      <NavLink to={`/dates/710`}> 10 </NavLink><br/>
      <NavLink to={`/dates/711`}> 11 </NavLink><br/>
      <NavLink to={`/dates/712`}> 12 </NavLink><br/>
      </div>
    )}
}


const mapStateToProps = state => {
  return {
    dates: state.dates.dates
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveDates: (d) => {
      dispatch({type: 'SAVE_DATES', payload: d})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Calendar);
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
