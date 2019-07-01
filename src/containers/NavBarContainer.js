import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {Spring,config} from 'react-spring/renderprops'

import '../App.css'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm.js';


class NavBarContainer extends Component {

  signOut = () => {
    localStorage.removeItem('token')
    this.props.clearCurrentUser()
  }

  render() {
    return (
      <div className="header">
      <Spring from={{ number: 0 }} to={{ number: 100 }} config={config.slow}>
        {props => (
         <div style={{ width: props.number + "%" }}>
           <nav className="nav-bar">
               <NavLink exact activeClassName="active" to="/">Home</NavLink>
               <NavLink activeClassName="active" to="/bios">Bio</NavLink>
               <NavLink exact activeClassName="active" to="/contact">Contact</NavLink>
                <NavLink exact activeClassName="active" to="/events">Events</NavLink>
               <br/>
           </nav>
         </div>
       )}
   </Spring>
      <div>
        <button onClick={this.signOut}>Sign out</button>
        <LoginForm formInput={this.props.formInput}/>
        <SignUpForm formInput={this.props.formInput}/>
      </div>
    </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)
)

// <AccessibilityContainer>
//   dark={dark}
//   sizeUp={sizeUp}
//   fontReadable={fontReadable}
//   changeSetting={changeSetting}
// /><br/>
//
// <NavigationButtonsContainer
//   logged={logged}
//   caseStudies={caseStudies}
//   changeSetting={changeSetting}
// />

        // <button onclick={`/users/${this.props.currentUser.id}`}>Profile</button>
