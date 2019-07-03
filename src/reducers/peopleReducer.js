export default function peopleReducer(
  state = {
    people: [],
    person: {}
  },
  action
){
    switch(action.type){
      case 'SAVE_PEOPLE':
        return {...state, people: action.payload}
      case 'SAVE_PERSON':
        return {...state, person: action.payload}
      case 'ADD_PERSON':
        return {...state, people: [...state.people, action.payload]}
      default:
        return state;
    }
  };
