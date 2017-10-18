import {
  GET_ALL_CONTENT_DATA
} from '../../../constants';

export const GET_ALL_CONTENT_DATA_SUCCESS = 'GET_ALL_CONTENT_DATA_SUCCESS';
export const GET_ALL_CONTENT_DATA_FAILS = 'GET_ALL_CONTENT_DATA_FAILS';
export const LOAD_MORE_GET_ALL_CONTENT_DATA = "LOAD_MORE_GET_ALL_CONTENT_DATA";
export const PULL_TO_REFRESH_ALL_CONTENT_DATA = "PULL_TO_REFRESH_ALL_CONTENT_DATA";
export const getAllContentsData = (page,user_token) => {
  return function (dispatch) {
    console.log(GET_ALL_CONTENT_DATA + page + '&per_page=10');

    fetch(GET_ALL_CONTENT_DATA + page + '&per_page=10' + '&user_token='+user_token)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_ALL_CONTENT_DATA_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_CONTENT_DATA_FAILS,
        });
        alert(error);
      });
  };
};
export const loadMoreGetAllContent= () => {
  return {
    type: LOAD_MORE_GET_ALL_CONTENT_DATA,
  };
};
export const pullRefreshAllContent= () => {
  return {
    type: PULL_TO_REFRESH_ALL_CONTENT_DATA,
  };
};
