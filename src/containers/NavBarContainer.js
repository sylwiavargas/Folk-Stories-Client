import React, { Component } from 'react';
import LoginContainer from './LoginContainer.js';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class NavBarContainer extends Component {

  signOut = () => {
    localStorage.removeItem('jwt')
    this.props.clearCurrentUser()
  }

  render() {
    return (
      <div>
        <button onclick={this.signOut}>Sign out</button>
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
