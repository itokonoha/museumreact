import { GET_PURCHASE_TOURS_DETAIL, GET_PURCHASE_TOURS_DETAIL_FAILS, LOAD_NEW } from './PurchaseTourDetailActions';

const INITIAL_STATE = {
  tourDetail: {},
  loadingDetail: true,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PURCHASE_TOURS_DETAIL:
      return { ...state, tourDetail: action.payload, loadingDetail: false };
    case GET_PURCHASE_TOURS_DETAIL_FAILS:
      return { ...state, loadingDetail: false };
    case LOAD_NEW:
      return { ...state, tourDetail: {}, loadingDetail: true };
    default:
      return state;
  }
};
