import {
  CONTENT_DETAILS
} from '../../../constants';

export const CONTENT_DETAILS_SUCCESS = 'CONTENT_DETAILS_SUCCESS';
export const CONTENT_DETAILS_FAILS = 'CONTENT_DETAILS_FAILS';
export const LOAD_MORE_GET_CONTENT_DETAILS = "LOAD_MORE_GET_CONTENT_DETAILS";
export const LOAD_NEW_CONTENT_DETAILS = "LOAD_NEW_CONTENT_DETAILS";
export const getContentsDetails = (id) => {
  return function (dispatch) {
    console.log(CONTENT_DETAILS +id+'.json' );

    fetch(CONTENT_DETAILS +id+'.json')
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: CONTENT_DETAILS_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: CONTENT_DETAILS_FAILS,
        });
        alert(error);
      });
  };
};
export const loadMoreContentDetail= () => {
  return {
    type: LOAD_MORE_GET_CONTENT_DETAILS,
  };
};
export const loadNewDetails= () => {
  return {
    type: LOAD_NEW_CONTENT_DETAILS,
  };
};
