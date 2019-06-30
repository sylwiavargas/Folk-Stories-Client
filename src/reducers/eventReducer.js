export default function eventReducer(
  state = {
    events: []
  },
  action
){
    switch(action.type){
      case 'SAVE_EVENTS':
        return {...state, events: action.payload}
      default:
        return state;
    }
  };
