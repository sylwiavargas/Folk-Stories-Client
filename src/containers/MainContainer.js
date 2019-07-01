
import React, { Component } from 'react';
import { Spring,config } from 'react-spring/renderprops';
import '../App.css'
import EventContainer from './EventContainer'
import moment from 'moment';


class MainContainer extends Component {

  render() {

    return(
      <div className="main">
      <Spring config={config.default}
      from={{ opacity: 0.6, marginLeft: -10 }}
      to={{ opacity: 1, marginLeft: 50 }}
    >
      {props => (
        <div style={props}>
          <article className="post">
            <h1>{moment().format('D MMMM YYYY')} || Happened today:</h1>
            <EventContainer />
          </article>
        </div>
      )}
    </Spring>

      </div>
    )
  }

}

export default MainContainer;
