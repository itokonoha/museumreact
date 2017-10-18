import { GET_AUDIO_TOURS_DETAIL, GET_AUDIO_TOURS_DETAIL_FAILS, LOAD_NEW, BUY_FREE, BUY_FREE_FAIL, START_PURCHASE_LOAD, STOP_PURCHASE_LOAD } from './AudioTourDetailActions';

const INITIAL_STATE = { tourDetail: {}, loadingDetail: true, purchaseResponse: {}, showPurchaseLoading: false }
export default(state= INITIAL_STATE ,action) => {
  switch (action.type) {
    case GET_AUDIO_TOURS_DETAIL:
      return { ...state, tourDetail: action.payload, loadingDetail: false };
    case GET_AUDIO_TOURS_DETAIL_FAILS:
      return { ...state, loadingDetail: false };
    case LOAD_NEW:
      return { ...state, tourDetail: {}, loadingDetail: true };
    case BUY_FREE:
      return { ...state, purchaseResponse: action.payload, showPurchaseLoading: false };
    case BUY_FREE_FAIL:
      return { ...state, showPurchaseLoading: false };
    case START_PURCHASE_LOAD:
      return { ...state, showPurchaseLoading: true };
    case STOP_PURCHASE_LOAD:
      return { ...state, showPurchaseLoading: false };
    default:
      return state;
  }
};
