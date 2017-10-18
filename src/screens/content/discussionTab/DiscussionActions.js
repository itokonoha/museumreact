import {
  GET_DISCUSSION_DATA
} from '../../../constants';

export const GET_DISCUSSION_SUCCESS = 'GET_DISCUSSION_SUCCESS';
export const GET_DISCUSSION_FAILS = 'GET_DISCUSSION_FAILS';
export const LOAD_MORE_DISCUSSION ="LOAD_MORE_DISCUSSION";
export const PULL_REFRESH_DISCUSSION ="PULL_REFRESH_DISCUSSION";

export const getDiscussionsData = (page) => {
  return function (dispatch) {
    console.log(GET_DISCUSSION_DATA + page + '&per_page=10');
    fetch(GET_DISCUSSION_DATA + page + '&per_page=10')
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_DISCUSSION_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DISCUSSION_FAILS,
        });
        alert(error);
      });
  };
};
export const loadMoreDiscussion = () => {
  return {
    type: LOAD_MORE_DISCUSSION,
  };
};

export const pullRefreshDiscussion= () => {
  return {
    type: PULL_REFRESH_DISCUSSION,
  };
};
