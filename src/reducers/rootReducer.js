import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import peopleReducer from './peopleReducer';
import eventReducer from './eventReducer';

const rootReducer = () => combineReducers({
  loading: loadingReducer,
  user: userReducer,
  people: peopleReducer,
  events: eventReducer
});

export default rootReducer;
