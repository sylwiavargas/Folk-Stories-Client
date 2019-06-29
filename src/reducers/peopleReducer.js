export default function peopleReducer(
  state = {
    people: []
  },
  action
){
    switch(action.type){
      case 'SAVEPEOPLE':
        return {...state, people: action.payload}
      default:
        return state;
    }
  };
