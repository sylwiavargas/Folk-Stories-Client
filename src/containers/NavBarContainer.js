import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'

import '../App.css'
import hamburger from '../assets/images/hamburger.png'
import MapContainer from './MapContainer'


class NavBarContainer extends Component {

  goBack = () => {
    this.props.history.push('/')
  }

  state = {
    show: false
  }

  toggleClass = () => {
    this.setState({
      show: !this.state.show})
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.toggleClass()
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        show: false
      })
    }
  }


  render() {
    let navbarClass = ["navbar"];

    if(this.state.show === true) {
      navbarClass.push('hello')
    } else {
      navbarClass.push('bye')
    }

    return (
      <div>
        <nav className="header">
        <img src={hamburger} className="hamburger inline" alt="menu" onClick={this.toggleClass} tabIndex="0" onKeyPress={this.handleKeyPress}/>
       {
          localStorage.token ?
              <>
               <Link onClick={this.signOut} className="notbutton inline right-margin">Sign out</Link>
               <ul className={navbarClass.join(' ')} id="js-menu">
                   <li><NavLink activeClassName="active" to="/dates" className="navlink">Events</NavLink></li>
                  <li><NavLink activeClassName="active" to="/bios" className="navlink">Bios</NavLink></li>
                  <li><NavLink activeClassName="active" to="/places" className="navlink">Places</NavLink></li>
                  <li><NavLink activeClassName="active" to="/contribute" className="navlink">Contribute!</NavLink></li>
                  <li><NavLink activeClassName="active" to="/you" className="navlink">You</NavLink></li>
               </ul>
               </>
            :
                <>
                <Link onClick={this.loginRoute} className="notbutton inline right-margin">Login</Link>
                <Link onClick={this.signupRoute} className="notbutton inline right-margin">SignUp</Link>
                    <ul className={navbarClass.join(' ')}>
                      <li><NavLink activeClassName="active" to="/dates" className="navlink">Events</NavLink></li>
                      <li><NavLink activeClassName="active" to="/bios" className="navlink">Bios</NavLink></li>
                      <li><NavLink activeClassName="active" to="/places" className="navlink">Places</NavLink></li>
                    </ul>
                  </>
        }
    </nav>
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
