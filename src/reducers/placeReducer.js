export default function placeReducer(
  state = {
    places: [],
    place: {},
    pps: [],
  },
  action
){
    switch(action.type){
      case 'SAVE_PLACES':
        return {...state, places: action.payload}
      case 'SAVE_PLACE':
        return {...state, place: action.payload}
      case 'SAVE_PPS':
        return {...state, pps: action.payload}
      default:
        return state;
    }
  };
