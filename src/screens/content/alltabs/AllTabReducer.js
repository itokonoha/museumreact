import { GET_ALL_CONTENT_DATA_SUCCESS, GET_ALL_CONTENT_DATA_FAILS, LOAD_MORE_GET_ALL_CONTENT_DATA, PULL_TO_REFRESH_ALL_CONTENT_DATA } from './AllTabActions';
const INITIAL_STATE = { allContentDATA: [], loading: true, loadMore: false, pullToRefresh: false };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_ALL_CONTENT_DATA_SUCCESS:
      return { ...state,
        allContentDATA: state.allContentDATA.concat(action.payload),
        loading: false,
        loadMore: false,
        initialPage:0,
        pullToRefresh: false
      };
    case GET_ALL_CONTENT_DATA_FAILS:
      return { ...state, loading: false, loadMore: false, pullToRefresh: false };
    case LOAD_MORE_GET_ALL_CONTENT_DATA:
      return { ...state, loadMore: true, pullToRefresh: false };
    case PULL_TO_REFRESH_ALL_CONTENT_DATA:
      return { ...state, pullToRefresh: true, allContentDATA: [], loading: false };
    default:
      return state;
  }
};
