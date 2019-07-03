export default function dateReducer(
  state = {
    dates: [],
    featuredDates: []
  },
  action
){
    switch(action.type){
      case 'SAVE_DATES':
        return {...state, dates: [action.payload]}
      case 'ADD_DATE':
          return {...state, dates: [...state.dates, action.payload]}
      case 'SELECT_CATEGORY':
        return {...state, featuredDates: [...state.featuredDates, action.payload]}
      case 'DELETE_CATEGORY':
        return {...state, featuredDates: action.payload}
      case 'SELECT_ALL':
        return {...state, featuredDates: action.payload}
      default:
        return state;
    }
  };
