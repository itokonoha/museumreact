import {
  SEARCH_RESULT
} from '../../../constants';

export const SEARCH_RESULT_SUCCESS = 'SEARCH_RESULT_SUCCESS';
export const SEARCH_RESULT_FAILS = 'SEARCH_RESULT_FAILS';
export const LOAD_MORE_SEARCH_RESULT= "LOAD_MORE_SEARCH_RESULT";
export const LOAD_NEW_SEARCH = 'LOAD_NEW_SEARCH';
export const REMOVE_PREVIOUS_SEARCH = 'REMOVE_PREVIOUS_SEARCH';
export const getSearchData = (query, page, user_token) => {
  return function (dispatch) {
    console.log(SEARCH_RESULT +query +'&page='+ page + '&per_page=10' + '&user_token='+user_token);
    fetch(SEARCH_RESULT +query +'&page='+ page + '&per_page=10' + '&user_token='+user_token)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: SEARCH_RESULT_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: SEARCH_RESULT_FAILS,
        });
        alert(error);
      });
  };
};
export const loadNewSearch = () => {
  return {
    type: LOAD_NEW_SEARCH,
  };
};
export const removePreviousSearch = () => {
  return {
    type: REMOVE_PREVIOUS_SEARCH,
  };
};
export const loadMoreSearch = () => {
  return {
    type: LOAD_MORE_SEARCH_RESULT,
  };
};
