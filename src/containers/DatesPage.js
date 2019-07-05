import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Switch, Route  } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Trail } from "react-spring/renderprops";
// import {Spring,config} from 'react-spring/renderprops'
import TodayEventContainer from './TodayEventContainer';
import EverydayEventContainer from './EverydayEventContainer';
import Calendar from '../components/Calendar';
import MonthContainer from './MonthContainer';

// import facebook from '../img/facebook.png';
// import twitter from '../img/twitter.svg';

class DatesPage extends Component {

// when user clicks anything, the state will change and a different container will render

  render() {
    // console.log(this.props)
    return (
      <div>
      <Calendar onClick={this.chageState}/>
        <div>
        <Switch>
          <Route exact path="/dates" component={TodayEventContainer} />
          <Route exact path="/dates/:id/:id" component={EverydayEventContainer} />
          <Route exact path="/dates/:id" component={MonthContainer} />
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
  mapStateToProps, mapDispatchToProps)(DatesPage);
