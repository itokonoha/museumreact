import {
  GET_MY_PROFILE
} from '../../constants';
export const PROFILE_SUCCESS="profile_success";
export const PROFILE_FAIL="profile_fail";
export const LOGOUT="logout";

export const getProfileDetails = (userId) => {
  return function (dispatch) {
    console.log("Profile url",GET_MY_PROFILE + userId + '.json');
    fetch(GET_MY_PROFILE + userId + '.json')
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Profile resp",responseJson);
        dispatch({
          type: PROFILE_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        console.log("Profile Error",error);
        dispatch({
          type: PROFILE_FAIL,
        });
        alert(error);
      });
  };
};
export const logout = () =>{
  return function (dispatch) {
    dispatch({
      type: LOGOUT
    });
;}
};
