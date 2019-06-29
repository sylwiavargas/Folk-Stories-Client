import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import peopleReducer from './peopleReducer'

const rootReducer = () => combineReducers({
  loading: loadingReducer,
  user: userReducer,
  people: peopleReducer
});

export default rootReducer;
