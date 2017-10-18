import { HOME_SCREEN_API } from '../../constants'

export const SHOW_USER = 'show_user';
export const USER_FAIL = 'user_fail';
export const HOME_LOADING = 'home_loading';
export const showUser = () => {
  return function (dispatch) {
    fetch(HOME_SCREEN_API)
      .then(function(response) {
          console.log("STATUS",response.status);
        if (response.status !== 200) {

          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: SHOW_USER,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_FAIL,
        });
        alert(error);
      });
  };
};
export const resetvalues = () => {
  return {
    type: USER_FAIL,
  };
};

export const loading = () => {
  return {
    type: USER_FAIL,
  };
};
