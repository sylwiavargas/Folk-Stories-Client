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
        <Spring from={{ number: 0 }} to={{ number: 100 }} config={config.slow}>
          {props => (
           <div style={{ width: props.number + "%" }}>
             <nav className="nav-bar">
                 <NavLink activeClassName="active" to="/">Home</NavLink><br/>
                 <NavLink activeClassName="active" to="/bios">Bio</NavLink><br/>
                  <NavLink activeClassName="active" to="/events">Events</NavLink><br/>
                  <NavLink activeClassName="active" to="/you">You</NavLink>
                 <br/>
             </nav>
           </div>
         )}
        </Spring>
        <br/>
        {localStorage.token ?
          <div>
            <button onClick={this.signOut}>Sign out</button>
          </div>
          :
          <div>
            <button onClick={this.loginRoute}>Login</button>
            <button onClick={this.signupRoute}>SignUp</button>
          </div>}
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
