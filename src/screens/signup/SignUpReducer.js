import { AsyncStorage } from 'react-native';
import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOADING_STARTED } from './SignUpActions';
import { LOGOUT } from '../profile/ProfileActions'
const INITIAL_STATE = { userData: {}, loading: true, auth: false, loadingWebService: false };
/* eslint no-mixed-spaces-and-tabs: "error"*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SIGN_UP_SUCCESS:
      try {
        AsyncStorage.setItem('user_token', action.payload.json.authentication_token);
      } catch (error) {
        // Error saving data
        console.log('Saving user_token Error', error);
      }
      return { ...state,
        userData: action.payload,
        loading: false,
        auth: true,
        loadingWebService: false };
    case SIGN_UP_FAIL:
      return { ...state, loading: true, auth: false, loadingWebService: false };
    case LOADING_STARTED:
      return { ...state, loadingWebService: true };
    case LOGOUT:
      return {...state,userData: {}, loading: true, auth: false, loadingWebService: false }; 
    default:
      return state;
  }
};
