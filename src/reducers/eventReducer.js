export default function eventReducer(
  state = {
    events: [],
    featuredEvents: []
  },
  action
){
    switch(action.type){
      case 'SAVE_EVENTS':
        return {...state, events: [action.payload]}
      case 'ADD_EVENT':
          return {...state, events: [...state.events, action.payload]}
      case 'SELECT_CATEGORY':
        return {...state, featuredEvents: [...state.featuredEvents, action.payload]}
      case 'DELETE_CATEGORY':
        return {...state, featuredEvents: action.payload}
        case 'DELETE_EVENTS':
          return {...state, events: []}
      case 'SELECT_ALL':
        return {...state, featuredEvents: action.payload}
      default:
        return state;
    }
  };
