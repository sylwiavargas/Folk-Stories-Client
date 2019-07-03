import React, { Component, Fragment } from 'react';
import { connect} from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Trail } from "react-spring/renderprops";
// import {Spring,config} from 'react-spring/renderprops'
import moment from 'moment';
import TodayEventContainer from './TodayEventContainer';
import EverydayEventContainer from './EverydayEventContainer';
import Calendar from '../components/Calendar';
import Notfound from '../components/notfound'

// import facebook from '../img/facebook.png';
// import twitter from '../img/twitter.svg';

class EventsPage extends Component {

// when user clicks anything, the state will change and a different container will render

  state = {
    daySelected: false,
  }

  render() {
    return (
      <div>
      <Calendar />
      <div>
      <Switch>
        <Route exact path="/dates" component={TodayEventContainer} />
        <Route exact path="/dates/:id" component={EverydayEventContainer} />
        <Route component={TodayEventContainer} />
      </Switch>
      </div>
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
  mapStateToProps, mapDispatchToProps)(EventsPage);