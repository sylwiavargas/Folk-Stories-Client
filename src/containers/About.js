import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom'
import Models from '../components/Models';

class About extends Component {

  render() {

    return(
      <div className="App">
      <div className="wrapper-about">
        <div className="header-second-about">
          <h1 style={{"textAlign": "center", "lineHeight": "0.5"}}>FOLK STORIES</h1>
          <h2 style={{"textAlign": "center", "lineHeight": "0.5"}}> - informal "read me"</h2>
        </div><br/>

      <div className="content-about">
        This app was developed as my final project of the <strong><a href="https://flatironschool.com/career-courses/coding-bootcamp/"> Flatiron School's Software Engineering Program</a></strong>. I aim to code for a better world and I try to devote my energy to projects that bring empowerment, foster collaboration and celebrate diversity. <br/>
        <strong> Folk Stories </strong> brings empowerment through histories and stories that didn't make it to hte school books - queer history, women history, black history. They are presented through bios, places and events. Get carried away and explore the page!
        <h1 style={{"textAlign": "center"}}>Technologies used:</h1><br/>
        <li> Ruby + Ruby on Rails back-end </li>
        <li> React + Redux front-end </li>
        <li> Maps: <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google Maps Javascript API </a></li>
        <li> Geolocation: <a href="https://www.w3schools.com/html/html5_geolocation.asp">Browser's geolocation </a></li>
        <li> Design: Pure CSS, <a href="https://www.npmjs.com/package/react-spring"> React Spring (animations)</a>, <a href="https://www.npmjs.com/package/d3/"> d3 (models) </a> (together with <a href="https://www.npmjs.com/package/react-faux-dom">React Faux DOM)</a></li>
        <li> Dates: <a href="https://momentjs.com/"> Moment.js </a></li>
        <li> Popups: <a href="https://www.npmjs.com/package/reactjs-popup">Reactjs-Popup </a></li>
        <li> Encryption + logins: <a href="https://rubygems.org/gems/bcrypt/versions/3.1.12">Bcrypt </a> and <a href="https://jwt.io/">JWT Web Tokens </a></li>
        <li> Wireframing: <a href="https://awwapp.com/">Awwboard </a> and <a href="https://www.adobe.com/products/xd.html">Adobe XD </a></li>
        <h1 style={{"textAlign": "center"}}>Challenges along the way:</h1><br/>
        <li> D3 almost fried my brain. </li>
        <li> Learning Redux under pressure was not fun. </li>
      </div>

      <div className="sidebar-about" style={{"fontSize": "35px"}}><br/><br/><br/><br/>
      <strong> NUMBERS:</strong><br/><br/>
      <li><strong> 46 </strong> cups of coffee</li>
      <li><strong> 102 </strong> hours of sleep</li>
      <li><strong> 113 </strong> major bugs squished</li>
      <li><strong> 4 </strong> bugs to be squished</li>
      <li><strong> 1113 </strong> lines of seed data</li>
      </div>
      <div className="content-about">
        <h1 style={{"textAlign": "center"}}>These are the models of the project:</h1><br/>
      </div>
      <br/><br/><br/>
      </div>

        <div className="footer-about models">
          <Models/>
          <br/><br/><br/>
        </div>
    </div>
)}
}



export default (About);
