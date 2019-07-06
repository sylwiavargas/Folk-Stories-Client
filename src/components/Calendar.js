import React, { Component } from 'react';
import { connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

class Calendar extends Component {

  // getDates = () => {
  //   fetch(API)
  //     .then(res => res.json())
  //     .then(e => this.props.saveDates(e))
  // }
  //
  // componentDidMount(){
  //   this.getDates()
  // }

  render() {

    return(
      <div className="main">
      <h1> <NavLink to={`/dates/7`} style={{"text-decoration": "none"}}> July </NavLink> </h1>
      <NavLink to={`/dates/7/71`} className="notbutton left space"> 1 </NavLink>
      <NavLink to={`/dates/7/72`} className="notbutton left space"> 2 </NavLink>
      <NavLink to={`/dates/7/73`} className="notbutton left space"> 3 </NavLink>
      <NavLink to={`/dates/7/74`} className="notbutton left space"> 4 </NavLink>
      <NavLink to={`/dates/7/75`} className="notbutton left space"> 5 </NavLink>
      <NavLink to={`/dates/7/76`} className="notbutton left space"> 6 </NavLink>
      <NavLink to={`/dates/7/77`} className="notbutton left space"> 7 </NavLink>
      <NavLink to={`/dates/7/78`} className="notbutton left space"> 8 </NavLink>
      <NavLink to={`/dates/7/79`} className="notbutton left space"> 9 </NavLink>
      <NavLink to={`/dates/7/710`} className="notbutton left space"> 10 </NavLink>
      <NavLink to={`/dates/7/711`} className="notbutton left space"> 11 </NavLink>
      <NavLink to={`/dates/7/712`}className="notbutton left space"> 12 </NavLink><br/>
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
