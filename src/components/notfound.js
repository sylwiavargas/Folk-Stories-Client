import React, { Component, Fragment } from 'react';
import Goo from './Goo'

class Notfound extends Component {

  state = {
    time: 15
  };

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: this.state.time - 1
    }), 1000);
  }

  componentDidMount() {
    this.startTimer()
  }

  goBack = () => {
    this.props.history.push('/')
  }

  render() {
    console.log("Goo comes from a codepen by drcmda: https://codesandbox.io/embed/8zx4ppk01l")
    return (
      <div>
        {
          this.state.time < 15 ?
          <Fragment>
          <Goo />
          <p className="main">
          <div>
          <h1>Oof, non-existent page!</h1>
          <h2> You will be redirected in {this.state.time} seconds. </h2>
          <button onClick={this.goBack}>Go back now</button>
          <h2> Or play with goo. </h2>
          </div>
          </p>
          </Fragment>
          :
          this.state.time !== 0 ?
          <Fragment>
          <p className="main">
          <div>
          <h1>Oof, non-existent page!</h1>
          <h2> You will be redirected in {this.state.time} seconds. </h2>
          <button onClick={this.goBack}>Go back now</button>
          </div>
          </p>
          </Fragment>
          :
          this.goBack()
        }
      </div>
    )
  }

}

export default Notfound;
