export default function userReducer(
  state = {
    username: "",

  },
  action
){
    switch(action.type){
      case 'UPDATE_FORM':
        console.log(action.type)
        return {...state, username: action.payload}
      default:
        return state;
    }
  };
