import React, { Component, Fragment } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Spring,config} from 'react-spring/renderprops';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';
import Loading from '../components/Loading';


class EverydayEventContainer extends Component {

  state = {
    allEvents: false,
    queer: false,
    women: false,
    loading: true,
  }

  getEvents = () => {
    const num = this.props.match.params.id
    const datesapi = `http://localhost:3000/api/v1/dates/${num}`
    fetch(datesapi)
    // fetch(`http://localhost:3000/api/v1/events`)
      .then(res => res.json())
      .then(events => {
        this.props.saveEvents(events)
        if (this.props.user.currentUser.types) {
          if (this.state.allEvents === false) {
            this.handleUserTypes(events)
            this.setState({
              loading: false
            })
          }
        } else {
          this.setState({
            loading: false
          })
        }
      })
      // .then(console.log("fetch done"))
      // .then(this.handleUserTypes())
    // debugger
    }

  componentDidMount(){
    this.getEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        loading: true
      })
      this.props.deleteEvents()
      this.getEvents()
    }
  }

  handleAll = () => {
    const featuredEvents = []
    this.getEvents()
    this.setState({
      allEvents: true,
      queer: false,
      women: false
    }, () => console.log("inside handleAll after setState", this.props.events))

    this.props.selectAll(featuredEvents)
  }

  handleWomen = () => {
    let womenEvents = [];
    womenEvents = this.props.events.filter((event) => {
      // console.log(event.event.types)
      // if event.types includes an object with id = 1
      return event.event.types.map(typeObj => typeObj.id).includes(1)
    })
    if (this.state.women === false) {
      womenEvents.forEach((e) => this.props.selectCategory(e))
      this.setState({
        women: true,
        allEvents: false
      })
    } else {
    this.setState({
      women: false
    })
    let newE = this.props.featuredEvents.filter((e) => !womenEvents.includes(e))
    this.props.deleteCategory(newE)
  }}

  handleQueer = () => {
    // debugger
    let queerEvents = [];
      queerEvents = this.props.events.filter((event) => {
      return event.event.types.map(typeObj => typeObj.id).includes(2)
    })
    if (this.state.queer === false) {
      queerEvents.forEach((e) => this.props.selectCategory(e))
      this.setState({
        queer: true,
        allEvents: false
      })
    } else {
    this.setState({
      queer: false
    })
    let newE = this.props.featuredEvents.filter((e) => !queerEvents.includes(e))
    this.props.deleteCategory(newE)
  }}

  handleUserTypes = (events) => {
    const userTypes = this.props.user.currentUser.types;
    // let userEvents = [];

    userTypes.forEach((type) => {
         type.name_eng === "Women" ?
            this.handleWomen()
          : type.name_eng === "Queer" ?
            this.handleQueer()
          :
            this.handleAll()
          }
      )
    }


  render() {
    const evs = this.props.events;
    const efs = this.props.featuredEvents;
    const month = this.props.match.params.id.substring(0,1)
    const day = this.props.match.params.id.substring(1)

    const backgrounds = ["gradient-five", "gradient-four", "gradient-three", "gradient-two", "gradient-one"]
    const pickOne = () => backgrounds[Math.floor(Math.random()*backgrounds.length)]

    return (
      <div>
        <div>
          <Spring config={config.default}
            from={{ opacity: 0.6, marginLeft: -10 }}
            to={{ opacity: 1, marginLeft: 50 }}
            >
            {props => (
              <div style={props}>
              <h1> Here's what happened on {month}/{day} :</h1>
              </div>
            )}
          </Spring>
          <div className="margin">
            <button onClick={this.handleAll} className="notbutton left"> All </button>
            <button onClick={this.handleWomen} className="notbutton left"> Women </button>
            <button onClick={this.handleQueer} className="notbutton left"> Queer </button><br/><br/><br/><br/>
          </div>
        </div>

        {this.state.loading === false ?
          <ul>
          {efs && efs.length > 0 ?
            efs.map((event, index) =>
            <Fragment key={index}>
            <div className={`event-wrapper-scaled ${pickOne()}`}>
            <div className="event-scaled">
              <h2> {event.event.year_era_id}: {event.event.title_eng} </h2>
              <p className="inline "><strong>Event category:</strong>
              {event.event.types.map((type) => <> &nbsp;  {type.name_eng.toLowerCase()} </>)}</p>
              <p> {event.event.description_eng} </p>
              {event.event.read_more_eng && event.event.read_more_eng !== null && event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i) !== null ?
              <p> Read more about this event at <a href={event.event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
              </a> </p>
              : null}
              {event.event.people ?
                <>
                  <strong className=""> Related people: </strong><br/> <br/> {event.event.people.map((person, index) => {
                  return (<>
                  <div className="image-cropper-mini inline margin">
                  <Link to={`/bios/${person.id}`}  key={index}> <img src = {person.picture} alt={person.name}/></Link>
                  </div>
                  </>)
                  })}
                  </> : null}
               <p className=""> <strong> Share with friends: </strong></p>
               <div className="">
              <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
              <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a></div><br/><br/>
              </div>
              </div>
              <br/>
            </Fragment>
             )
             : evs !== undefined && evs.length > 0 ?
             evs.map((event, index) =>
             <Fragment key={index}>
             <div className={`event-wrapper-scaled ${pickOne()}`}>
             <div className="event-scaled">
               <h2> {event.event.year_era_id}: {event.event.title_eng} </h2>
               <p className="inline "><strong>Event category:</strong>
               {event.event.types.map((type) => <> &nbsp;  {type.name_eng.toLowerCase()} </>)}</p>
               <p> {event.event.description_eng} </p>
               {event.event.read_more_eng && event.event.read_more_eng !== null && event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i) !== null ?
               <p> Read more about this event at <a href={event.event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
               </a> </p> : null}
               {event.event.people ?
                 <>
                   <strong className=""> Related people: </strong><br/> <br/> {event.event.people.map((person, index) => {
                   return (<>
                   <div className="image-cropper-mini inline margin">
                   <Link to={`/bios/${person.id}`}  key={index}> <img src = {person.picture} alt={person.name}/></Link>
                   </div>
                   </>)
                   })}
                   </> : null}
                <p className=""> <strong> Share with friends: </strong></p>
                <div className="">
               <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
               <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a></div><br/><br/>
               </div>
               </div>
               <br/>
             </Fragment>
              )
      :
        <div>
        <p> Oh well, no events here yet! </p>
        <p> Would you like to <Link to={`/contribute`} style={{"color": "#2376ae"}}><strong>contribute?</strong></Link></p>
        </div>
      }
      </ul>
      : <p> One second, please! </p> }
      </div>
  )}

}

const mapStateToProps = state => {
  return {
    events: state.events.events[0],
    user: state.user,
    featuredEvents: state.events.featuredEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveEvents: (events) => {
      dispatch({type: 'SAVE_EVENTS', payload: events})
    },
    deleteEvents: (events) => {
      dispatch({type: 'DELETE_EVENTS'})
    },
    selectCategory: (events) => {
      dispatch({type: 'SELECT_CATEGORY', payload: events})
    },
    deleteCategory: (events) => {
      dispatch({type: 'DELETE_CATEGORY', payload: events})
    },
    selectAll: (events) => {
      dispatch({type: 'SELECT_ALL', payload: events})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(EverydayEventContainer);
