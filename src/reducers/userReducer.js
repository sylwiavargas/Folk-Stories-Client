export default function userReducer(
  state = {
    currentUser: {}
  },
  action
){
    switch(action.type){
      case 'LOGIN':
        return {...state, currentUser: action.payload}
      case 'CLEAR_CURRENT_USER':
        return {...state, currentUser: {}};
      default:
        return state;
    }
  };
