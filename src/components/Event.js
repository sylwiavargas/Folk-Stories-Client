import React, { Component  } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';

import arrow from '../img/arrow.png';


const API = "http://localhost:3000/api/v1/events"

class Event extends Component {

  goBack = () => {
    this.props.history.push('/')
  }

  state = {
    loading: true
  }

  getEvent = () => {
    // const num = this.props.match.params.id
    // const num = 1
    const num = this.props.eventId
    fetch(API + `/${num}`)
      .then(res => res.json())
      .then(e => this.props.saveEvents(e))
  }

  componentDidMount(){
    this.getEvent()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const backgrounds = ["gradient-five", "gradient-four", "gradient-three", "gradient-two", "gradient-one"]
    const pickOne = () => backgrounds[Math.floor(Math.random()*backgrounds.length)]
    console.log(this.props.events)

    return(
      <div className={` event-wrapper ${pickOne()}`}>
      { this.state.loading === false ?
        <div className="event">
        {this.props.events !== undefined && this.props.events.length > 0 ?
          this.props.events.map((event, index) => {
            return <li style={{"padding": "5%"}} key={index}>
            <h2> {event.event.month_id}/{event.event.day_id}/{event.event.year_era_id}: {event.event.title_eng}</h2>
            <p> {event.event.description_eng} </p>
            <p> Read more at <a href = {event.event.read_more_eng} target="_blank" rel="noopener noreferrer"> { event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]} </a> </p>

            <p>
            {event.event.people ?
              <>
                <strong> Related people: </strong><br/> <br/> {event.event.people.map((person, index) => {
                return (<>
                <div className="image-cropper-mini inline margin">
                <Link to={`/bios/${person.id}`}  key={index}> <img src = {person.picture} alt={person.name}/></Link>
                </div>
                </>)
                })}
                </> : null} <p> <strong> Share with friends: </strong></p>
                <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
                <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a><br/></p>
                </li>

          })
        : null
        }
        <button onClick={this.props.close} className={` notbutton ${pickOne()}`}> close me </button>
        </div>
      : <Loading /> }
    </div>
    )}
}

const mapStateToProps = state => {
  return {
    events: state.events.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (e) => {
      dispatch({type: 'SAVE_EVENTS', payload: e})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Event);
