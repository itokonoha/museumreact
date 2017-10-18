import { GET_AUDIO_TOURS, GET_AUDIO_TOURS_FAILS, LOAD_MORE, GET_PURCHASED_TOURS, GET_PURCHASED_TOURS_FAILS, START_LOADING_PURCHASED,LOAD_INITIAL } from './AudioTourActions';
import { BUY_FREE } from '../audioTourDetail/AudioTourDetailActions'
const INITIAL_STATE = { audioTours: [], loading: true, loadMore: false, purchasedTours: [], initialPage:0, isPurchasedLoadedOnce: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_AUDIO_TOURS:
      return { ...state,
        audioTours: state.audioTours.concat(action.payload),
        loading: false,
        loadMore: false,
        initialPage:0 };
    case GET_AUDIO_TOURS_FAILS:
      return { ...state, loading: false, loadMore: false, initialPage:0 };
    case LOAD_MORE:
      return { ...state, loadMore: true };
    case GET_PURCHASED_TOURS:
      if (action.payload === 0 || action.payload.length === 0) {
        alert("No Purchased tour yet.")
      }
      return { ...state,
        loading: false,
        loadMore: false,
        purchasedTours: action.payload, initialPage:1 , isPurchasedLoadedOnce:true};
    case GET_PURCHASED_TOURS_FAILS:
      return { ...state, loading: false, loadMore: false, initialPage:1,isPurchasedLoadedOnce:true  };
    case START_LOADING_PURCHASED:
      return { ...state, loading: true, loadMore: false,initialPage:1  };
    case LOAD_INITIAL:
      return { ...state, audioTours: [], loading: true, loadMore: false,purchasedTours: [],initialPage:0,isPurchasedLoadedOnce:false  };
      break;
    case BUY_FREE:
     return { ...state,
      loading: false,
      loadMore: false,
      purchasedTours: [], initialPage:0,isPurchasedLoadedOnce:false };
      break;
    default:
      return state;
  }
};
