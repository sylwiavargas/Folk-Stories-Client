import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import peopleReducer from './peopleReducer';
import eventReducer from './eventReducer';
import dateReducer from './dateReducer';
import placeReducer from './placeReducer';

const rootReducer = () => combineReducers({
  loading: loadingReducer,
  user: userReducer,
  people: peopleReducer,
  events: eventReducer,
  dates: dateReducer,
  places: placeReducer
});

export default rootReducer;
