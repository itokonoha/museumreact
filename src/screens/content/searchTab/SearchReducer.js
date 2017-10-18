import { SEARCH_RESULT_SUCCESS, SEARCH_RESULT_FAILS, LOAD_MORE_SEARCH_RESULT, LOAD_NEW_SEARCH, REMOVE_PREVIOUS_SEARCH  } from './SearchActions';
const INITIAL_STATE = { searchData: [], loading: true, loadMore: false, };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SEARCH_RESULT_SUCCESS:
    console.log('SSSSS',action.payload);

      if (action.payload.length === 0) {
        alert("No record found")
      }
      return { ...state,
        searchData: state.searchData.concat(action.payload),
        loading: false,
        loadMore: false,
        initialPage:0 };
    case SEARCH_RESULT_FAILS:
      return { ...state, loading: false, loadMore: false };
      case LOAD_MORE_SEARCH_RESULT:
        return { ...state, loadMore: true };
      case LOAD_NEW_SEARCH:
      return { ...state, loadMore: false, searchData: [], loading:true };
      case REMOVE_PREVIOUS_SEARCH:
        return { ...state, loadMore: false, searchData: [], loading:false };
        break;
    default:
      return state;
  }
};
