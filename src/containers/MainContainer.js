
import React, { Component } from 'react';
import NavBarContainer from './NavBarContainer'
import { Spring,config } from 'react-spring/renderprops';
import {useSpring,animated } from 'react-spring';
import { Trail } from "react-spring/renderprops";


class MainContainer extends Component {

  Test() {
    const props = useSpring({opacity: 1, from: {opacity: 0}})
    return <animated.div style={props}>Test</animated.div>
  }

  render() {

    const events = [
      { title: "First Event", id: 1 },
      { title: "Second Event", id: 2 },
      { title: "Third Event", id: 3 },
      { title: "Fourth Event", id: 4 }
    ];

    return(
      <div>
      <NavBarContainer />
      <Spring config={config.wobbly}
      from={{ opacity: 0.6, marginLeft: -10 }}
      to={{ opacity: 1, marginLeft: 50 }}
    >
      {props => (
        <div style={props} className="App">
          <article className="post">
            <h1>Main container here</h1>
            <p>
            How lovely it bounces.
            </p>
          </article>
        </div>
      )}
    </Spring>
    <Trail
     items={events}
     keys={event => event.id}
     from={{ marginLeft: -20, opacity: 0 }}
     to={{ marginLeft: 20, opacity: 1 }}
   >
     {event => props => (
       <div style={props} className="post">
            {event.title}
       </div>
     )}
   </Trail>
      </div>
    )
  }

}

export default MainContainer;
