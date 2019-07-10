import React, { Component } from 'react';
import { Spring, animated } from 'react-spring/renderprops'
import { GradientPurpleOrange as Gradient } from '@vx/gradient'
import * as easings from 'd3-ease'

export default class Loading extends Component {

  state = { offset: 0 }
  path = React.createRef()

  componentDidMount() {
    this.setState({ offset: this.path.current.getTotalLength() })
  }
  render() {
    const { offset } = this.state
    return (
      <div
        style={{
          background: '#272727',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
        onClick={() => this.forceUpdate()}>
        <h1> LOADING...</h1><br/><br/> <br/>
        <svg width="180" viewBox="0 0 23 23">
          <Gradient id="gradient-dashoffset" />
          <g
            fill="#373737"
            stroke="url(#gradient-dashoffset)"
            strokeWidth="0.5">
            <Spring
              native
              reset
              from={{ dash: offset }}
              to={{ dash: 0 }}
              config={{
                delay: 1,
                duration: 1500,
                easing: easings.easeCubic,
              }}>
              {props => (
                <animated.path
                  ref={this.path}
                  strokeDasharray={offset}
                  strokeDashoffset={props.dash}
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              )}
            </Spring>
          </g>
        </svg>
      </div>
    )
  }
}
