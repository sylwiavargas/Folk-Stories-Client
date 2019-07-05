import React, { Component, Fragment } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Trail } from "react-spring/renderprops";
import {Spring,config} from 'react-spring/renderprops'
import moment from 'moment';
// import psl from 'psl';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';
class MonthContainer extends Component {

    state = {
      allEvents: true,
      queer: false,
      women: false,
      month: ""
    }

    getMonth = () => {
      const num = this.props.match.params.id
      const datesapi = `http://localhost:3000/api/v1/months/${num}`
      fetch(datesapi)
        .then(res => res.json())
        .then(events => {
          this.props.saveEvents(events)
        })
      }

    componentDidMount(){
      this.getMonth();
      this.checkMonth()
    }

    checkMonth = () => {
      let month;
      const num = this.props.match.params.id
      switch (num) {
        case '1':
          month = 'January'
        break;
        case '2':
          month = 'February'
        break;
        case '3':
          month = 'March'
        break;
        case '4':
          month = 'April'
        break;
        case '5':
          month = 'May'
        break;
        case '6':
          month = 'June'
        break;
        case '7':
          month = 'July'
        break;
        case '8':
          month = 'August'
        break;
        case '9':
          month = 'September'
        break;
        case '10':
          month = 'October'
        break;
        case '11':
          month = 'November'
        break;
        case '12':
          month = 'December'
        break;
      }
      this.setState({
        month: month
      })
    }

    handleAll = () => {
      const featuredEvents = []
      this.getEvents()
      this.setState({
        allEvents: true,
        queer: false,
        women: false
      })
      this.props.selectAll(featuredEvents)
    }

    handleWomen = () => {
      let womenEvents = [];
      womenEvents = this.props.events.filter((event) => {
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

      const propsMonth = this.props.month
      let evs;
      if (propsMonth) {
        let evs = propsMonth.events;
        console.log(propsMonth.events)
      }
      const efs = this.props.featuredEvents;

      return (
        <div>
          <div>
            <Spring config={config.default}
              from={{ opacity: 0.6, marginLeft: -10 }}
              to={{ opacity: 1, marginLeft: 50 }}
            >
            {props => (
              <div style={props}>
              <h1> Here's what happened in {this.state.month}:</h1>
              </div>
            )}
            </Spring>
          </div>
        {propsMonth ?
          <div>
          {
            propsMonth.events.map((e) => <li key={e.id}>{e.year_era_id}: <Link to={`/events/${e.id}`}  key={e.id} arget="_blank" rel="noopener noreferrer">  {e.title_eng} </Link> <br/></li>)
          }
          </div>
          : null }
          </div>
    )}

  }


  // DELETED now
  //         <div>
          // <Spring config={config.default}
          //   from={{ opacity: 0.6, marginLeft: -10 }}
          //   to={{ opacity: 1, marginLeft: 50 }}
          //   >
          //   {props => (
          //     <div style={props}>
          //     <h1> Here's what happened in {this.state.month}:</h1>
          //     </div>
          //   )}
          // </Spring>
          // <button onClick={this.handleAll}> All </button>
          // <button onClick={this.handleWomen}> Women </button>
          // <button onClick={this.handleQueer}> Queer </button>
          // </div>
          // <ul>
          // {efs && efs.length > 0 ?
          //   efs.map((event, index) =>
          //     <Fragment key={index}>
          //      <h2> {event.event.year_era_id}: {event.event.title_eng} </h2>
          //      {event.event.types.map((type) => <p key={type.id}><strong>Event category:</strong> {type.name_eng.toLowerCase()}</p>)}
          //      <p> {event.event.description_eng} </p>
          //      <p> Read more about this event at <a href={event.event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { event.event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
          //        </a> </p>
          //      <p> <strong> Related people: </strong> {event.event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name} </Link>})} </p>
          //      <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
          //       <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
          //      </Fragment>
          //    )
          //   : propsMonth !== undefined && propsMonth.length > 0 ?
          //     <Trail
          //      items={evs}
          //      keys={event => event.id}
          //      from={{ marginLeft: -20, opacity: 0 }}
          //      to={{ marginLeft: 20, opacity: 1 }}
          //    >
          //      {event => props => (
          //        <div style={props}>
          //        <h2> {event.year_era_id}: {event.title_eng} </h2>
          //        <p> {event.description_eng} </p>
          //        <p> Read more about this event at <a href={event.read_more_eng.toString()} target="_blank" rel="noopener noreferrer"> { event.read_more_eng.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]}
          //          </a> </p>
          //        <p> <strong> Related people: </strong> {event.people.map((person, index) => {return <Link to={`/bios/${person.id}`}  key={index}>{person.name} </Link>})} </p>
          //        <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
          //         <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
          //        </div>
          //      )}
          //    </Trail>
          // :
          //   null
          // }
          // </ul>



  const mapStateToProps = state => {
    return {
      month: state.events.events[0],
      user: state.user,
      featuredEvents: state.events.featuredEvents
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      saveEvents: (events) => {
        dispatch({type: 'SAVE_EVENTS', payload: events})
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
  mapStateToProps, mapDispatchToProps)(MonthContainer);

// nested routing: https://codeburst.io/getting-started-with-react-router-5c978f70df91
//
// <div>
//   <h1>Users</h1>
//   <strong>select a person</strong>
//   <ul>
//     <li>
//       <Link to="/users/1">User 1 </Link>
//     </li>
//     <li>
//       <Link to="/users/2">User 2 </Link>
//     </li>
//     <li>
//       <Link to="/users/3">User 3 </Link>
//     </li>
//   </ul>
//   <Route path="/users/:id" component={User} />
// </div>

// const Person = ({ match }) => <p>{match.params.id}</p>
