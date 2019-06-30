export default function loadingReducer(
  state = {
    loading: true
  },
  action
){
    switch(action.type){
      case 'LOADING':
        return {...state, loading: false}

      default:
        return state;
    }
  };
