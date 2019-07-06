import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {Spring,config} from 'react-spring/renderprops'

import '../App.css'

class NavBarContainer extends Component {

  goBack = () => {
    this.props.history.push('/')
  }

  signupRoute = () => {
      let path = `/signUp`
      this.props.history.push(path)
  }

  loginRoute = () => {
      let path = `/login`
      this.props.history.push(path)
  }

  signOut = () => {
    localStorage.removeItem('token')
    this.props.clearCurrentUser()
    this.goBack()
  }

  render() {
    return (
      <div className="header">
        {
        localStorage.token ?
        <Spring from={{ number: 0 }} to={{ number: 100 }} config={config.slow}>
          {props => (
           <div style={{ width: props.number + "%" }}>
             <nav className="nav-bar">
                <NavLink exact activeClassName="active" to="/" className="navlink">Home</NavLink><br/>
                <NavLink activeClassName="active" to="/bios" className="navlink">Bios</NavLink><br/>
                <NavLink activeClassName="active" to="/dates" className="navlink">Events</NavLink><br/>
                <NavLink activeClassName="active" to="/contribute" className="navlink">Contribute!</NavLink><br/>
                <NavLink activeClassName="active" to="/you" className="navlink">You</NavLink><br/>
             </nav>
             <button onClick={this.signOut} >Sign out</button>
           </div>)}
          </Spring>
          :
          <div>
          <Spring from={{ number: 0 }} to={{ number: 100 }} config={config.slow}>
            {props => (
                <div style={{ width: props.number + "%" }}>
                <button onClick={this.loginRoute} style={{"float": "right"}}>Login</button>
                <button onClick={this.signupRoute} style={{"float": "right"}}>SignUp</button>
                  <nav className="nav-bar">
                    <NavLink activeClassName="active" to="/" className="navlink-logout">Home</NavLink><br/>
                    <NavLink activeClassName="active" to="/bios" className="navlink-logout">Bios</NavLink><br/>
                    <NavLink activeClassName="active" to="/dates" className="navlink-logout">Events</NavLink><br/>
                  </nav>
                </div>
            )}
          </Spring>
          </div>
      }
    </div>
  )}
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
