import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Switch, Route  } from 'react-router-dom';
import TodayEventContainer from './TodayEventContainer';
import EverydayEventContainer from './EverydayEventContainer';
import Calendar from '../components/Calendar';
import MonthContainer from './MonthContainer';

class DatesPage extends Component {


  render() {
    return (
      <div className="calendartable">
        <div>
          <Switch>
            <Route exact path="/dates" component={TodayEventContainer} />
            <Route exact path="/dates/:id/:id" component={EverydayEventContainer} />
            <Route exact path="/dates/:id" component={MonthContainer} />
            <Route component={TodayEventContainer} />
          </Switch>
        </div>
        <div>
          <Calendar onClick={this.chageState}/>
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
