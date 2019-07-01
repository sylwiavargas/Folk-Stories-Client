export default function eventReducer(
  state = {
    events: [],
    event: {}
  },
  action
){
    switch(action.type){
      case 'SAVE_EVENTS':
        return {...state, events: action.payload}
      case 'ADD_EVENT':
        return {...state, events: [...state.events, action.payload]}
      default:
        return state;
    }
  };
