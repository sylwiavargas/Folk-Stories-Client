export default function peopleReducer(
  state = {
    people: []
  },
  action
){
    switch(action.type){
      case 'SAVE_PEOPLE':
        return {...state, people: action.payload}
      default:
        return state;
    }
  };
