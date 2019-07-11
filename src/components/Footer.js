import React, { Component } from 'react';
import '../App.css'
import logo from '../assets/images/logo.png'
import qm from '../assets/images/qm.png'
import About from '../containers/About'


class Footer extends Component {

  render() {
    return (
    <div className="footer">
    <>
        <div></div>
        <div className="footer-center">
          <a href="/"><img src={logo} className="logo " alt="logo"/></a>
        </div>
        <div className="footer-right">
         <a href="/about"><img src={qm} className="logo-mini right inline" alt="logo"/></a>
        </div>
    </>
    </div>
    )
  }

}


export default Footer;
