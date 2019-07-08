import React, { Component } from 'react';
import '../App.css'
import logo from '../assets/images/logo.png'



class Footer extends Component {

  render() {
    return (
    <div className="footer">
        <img src={logo} className="logo" alt="logo"/>
    </div>
    )
  }

}


export default Footer;

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
