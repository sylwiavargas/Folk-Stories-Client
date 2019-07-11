import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Spring,config} from 'react-spring/renderprops'
import Popup from "reactjs-popup";
import Event from '../components/Event';


class MonthContainer extends Component {

    state = {
      allEvents: true,
      queer: false,
      women: false,
      month: "",
      loading: true

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.events.events !== this.props.events.events) {
          this.setState({
            loading: false
          })
        // console.log("prevProps", prevProps.events.events , "Thisprops", this.props.events.events )
        }
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
        default:
         month = "";
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

      const propsMonth = this.props.events.events

      return (
        <div>
        { this.state.loading === false ?
          propsMonth && propsMonth.length > 0 ?
          <>
          <div>
            <Spring config={config.default}
              from={{ opacity: 0.6, marginLeft: -30 }}
              to={{ opacity: 1, marginLeft: 10 }}
            >
            {props => (
              <div style={props}>
              <h1> Here's what happened in {this.state.month}:</h1>
              </div>
            )}
            </Spring>
          </div>
          <div className="month-wrapper">
          <div className="month">
          {
            propsMonth[0].events.map((e) =>
            <Popup trigger={
                <li key={e.id}><strong>{e.year_era_id}: </strong> <Link to={`/events/${e.id}`}  key={e.id} arget="_blank" rel="noopener noreferrer">  {e.title_eng} </Link> <br/></li>}
              position="top center">
              { close =>(
              <div className="modal-card" style={{"width": "1000px"}}>
                <Event eventId={e.id} close={close}/>
              </div>)}
          </Popup>
          )
          }
          </div>
          </div>
          </>
          : null
          : <p> loading </p> }
          </div>
    )}
  }


  const mapStateToProps = state => {
    return {
      events: state.events,
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
