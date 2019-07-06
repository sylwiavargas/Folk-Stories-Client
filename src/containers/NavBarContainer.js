import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'

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
            <>
             <nav className="navbar">
               <Link onClick={this.signOut} className="notbutton">Sign out</Link>
                <NavLink exact activeClassName="active" to="/" className="navlink">Today</NavLink><br/>
                <NavLink activeClassName="active" to="/bios" className="navlink">Bios</NavLink><br/>
                <NavLink activeClassName="active" to="/dates" className="navlink">Events</NavLink><br/>
                <NavLink activeClassName="active" to="/contribute" className="navlink">Contribute!</NavLink><br/>
                <NavLink activeClassName="active" to="/you" className="navlink">You</NavLink><br/>
             </nav>
             </>
          :
          <div>
              <>
                  <nav className="navbar">
                  <Link onClick={this.loginRoute} className="notbutton">Login</Link>
                  <Link onClick={this.signupRoute} className="notbutton">SignUp</Link>
                    <NavLink activeClassName="active" to="/" className="navlink">Today</NavLink><br/>
                    <NavLink activeClassName="active" to="/bios" className="navlink">Bios</NavLink><br/>
                    <NavLink activeClassName="active" to="/dates" className="navlink">Events</NavLink><br/>
                  </nav>
                </>
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
