import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom'
import Models from '../components/Models';

class About extends Component {

  render() {

    return(
      <div className="App">
          <div className="wrapper-bio">
            <div className="footer-bio models">
              <Models/>
            </div>
          <div className="content-bio">
          content
          </div>
            <div className="sidebar-bio">
          sidebar
            </div>
            <div className="header-second-bio">
          header
             </div>
            </div>
    </div>
)}
}



export default (About);
