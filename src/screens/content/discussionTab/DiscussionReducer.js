import { GET_DISCUSSION_SUCCESS, GET_DISCUSSION_FAILS, PULL_REFRESH_DISCUSSION } from './DiscussionActions';
const INITIAL_STATE = { discussionsDATA: [], loading: true, loadMore: false, pullToRefresh: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DISCUSSION_SUCCESS:
      return { ...state,
        discussionsDATA: state.discussionsDATA.concat(action.payload),
        loading: false,
        loadMore: false,
        initialPage:0,
        pullToRefresh: false
      };
    case GET_DISCUSSION_FAILS:
      return { ...state, loading: false, loadMore: false, pullToRefresh: false  };
    case PULL_REFRESH_DISCUSSION:
      return { ...state, loading: false, loadMore: false, pullToRefresh: true, discussionsDATA:[]  };  
    case PULL_REFRESH_DISCUSSION:
      return { ...state, loading: false, loadMore: true, pullToRefresh: false  };
    default:
      return state;
  }
};
