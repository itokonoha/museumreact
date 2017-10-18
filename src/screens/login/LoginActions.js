import { Actions } from 'react-native-router-flux';
import { LOGIN_API } from '../../constants';

export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const LOADING_STARTED = 'loading_started';

export const login = (email, password) => {
  return function (dispatch) {
    var params = {
      'user[email]': email,
      'user[password]': password,
    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    var request = {
      method: 'POST',
      body: formData,
    };

    fetch(LOGIN_API, request)
     .then((response) => response.json())
    .then((responseJson) => {
      console.log(" LoginResp",responseJson);
      if (responseJson.json !=null ) {
        dispatch({ type: LOGIN_SUCCESS, payload: responseJson });
        Actions.pop();
      }
      else {
        if (responseJson.errors.email != null) {
          throw new Error(responseJson.errors.email[0]);
        }
        else if (responseJson.errors.password != null) {
          throw new Error(responseJson.errors.password[0]);
        }else {
          throw new Error("Bad response from server");
        }

      }

    })
    .catch((error) => {
      console.log(error);
      alert(error);
      dispatch({ type: LOGIN_FAIL });
    });
  };
};
export const loadingStarted = () => {
  return {
    type: LOADING_STARTED,
  };
};
