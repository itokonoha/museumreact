import { Actions } from 'react-native-router-flux';
import { REGISTER_API } from '../../constants';

export const SIGN_UP_SUCCESS = 'signup_success';
export const SIGN_UP_FAIL = ' signup_fail';
export const LOADING_STARTED = 'loading_started';

/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const signUp = (email, password, confirmPassword, firstName, lastName) => {
  return function (dispatch) {
    var params = {
      'user[email]': email,
      'user[password]': password,
      'user[password_confirmation]': confirmPassword,
      'user[first_name]': firstName,
      'user[last_name]': lastName
    };

    var formData = new FormData();
    
    for(var k in params) {
      formData.append(k, params[k]);
    }

    var request = {
      method: 'POST',
      body: formData
    };

    fetch(REGISTER_API, request)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: responseJson,
        });
        //   Actions.Home();
        Actions.pop();
        Actions.pop();
      })
      .catch((error) => {
        alert(error);
        dispatch({
          type: SIGN_UP_FAIL,
        });
      });
  };
};

export const loadingStarted = () => {
  return {
    type: LOADING_STARTED,

  };
};
