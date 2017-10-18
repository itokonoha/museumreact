import {
  GET_MORE_LIST
} from '../../constants';
export const GET_MORE_SUCCESS = "get_more_success";
export const GET_MORE_FAIL = "get_more_fail";

export const getMore = (userId) => {
  return function (dispatch) {
    fetch(GET_MORE_LIST)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Profile resp",responseJson);
        dispatch({
          type: GET_MORE_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        console.log("Profile Error",error);
        dispatch({
          type: GET_MORE_FAIL
        });
        alert(error);
      });
  };
};
