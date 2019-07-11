import React, { Component } from 'react';
import { connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

class Calendar extends Component {


  render() {

    return(
      <div className="main">
      <h1> <NavLink to={`/dates/7`} style={{"textDecoration": "none"}}> July </NavLink> </h1>
      <NavLink to={`/dates/7/78`}className="notbutton left space"> 8 </NavLink>
      <NavLink to={`/dates/7/79`} className="notbutton left space"> 9 </NavLink>
      <NavLink to={`/dates/7/710`} className="notbutton left space"> 10 </NavLink>
      <NavLink to={`/dates/7/711`} className="notbutton left space"> 11 </NavLink>
      <NavLink to={`/dates/7/712`}className="notbutton left space"> 12 </NavLink>
      <NavLink to={`/dates/7/713`}className="notbutton left space"> 13 </NavLink>
      <NavLink to={`/dates/7/714`}className="notbutton left space"> 14 </NavLink>
      <NavLink to={`/dates/7/715`}className="notbutton left space"> 15 </NavLink>
      <NavLink to={`/dates/7/716`}className="notbutton left space"> 16 </NavLink>
      <NavLink to={`/dates/7/717`}className="notbutton left space"> 17 </NavLink><br/>
<br/>
<br/>
<br/>
<br/>

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
