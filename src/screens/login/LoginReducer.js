import { AsyncStorage } from 'react-native';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOADING_STARTED } from './LoginActions';
import { LOGOUT } from '../profile/ProfileActions'
const INITIAL_STATE = { email: '', password: '', login: false, loadingSignInWebService: false, loginResponse: {} };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      try {
        AsyncStorage.setItem('user_token', action.payload.json.authentication_token);
        AsyncStorage.setItem('user_id', action.payload.json.id);
      } catch (error) {
        // Error saving data
        console.log('Saving user_token Error', error);
      }
      return { ...state,
        email: action.payload.email,
        login: true,
        loadingSignInWebService: false,
        loginResponse: action.payload };
    case LOGIN_FAIL:
      return { ...INITIAL_STATE, login: false, loadingSignInWebService: false };
    case LOADING_STARTED:
      return { ...state, loadingSignInWebService: true };
    case LOGOUT:
      return {...state, email: '', password: '', login: false, loadingSignInWebService: false, loginResponse: {} }
    default:
      return state;
  }
}
