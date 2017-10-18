import { CONTENT_DETAILS_SUCCESS, CONTENT_DETAILS_FAILS, LOAD_MORE_GET_CONTENT_DETAILS, LOAD_NEW_CONTENT_DETAILS } from './ContentDetailsActions';
const INITIAL_STATE = { contentDetails: {}, loading: true, loadMore: false, };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case CONTENT_DETAILS_SUCCESS:
      return { ...state,
        contentDetails: action.payload,
        loading: false,
        loadMore: false,
        initialPage:0
      };
    case CONTENT_DETAILS_FAILS:
      return { ...state, loading: false, loadMore: false };
    case LOAD_MORE_GET_CONTENT_DETAILS:
      return { ...state, loadMore: true };
    case LOAD_NEW_CONTENT_DETAILS:
      return { ...state, contentDetails: {} , loading: true };
    default:
      return state;
  }
};
