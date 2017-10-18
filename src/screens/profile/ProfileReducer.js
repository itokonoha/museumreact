import { PROFILE_SUCCESS,PROFILE_FAIL,LOGOUT } from './ProfileActions';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = { profile: false, profileResponse: {}, loadingDetail: true,isLoggedOut: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return { ...state, profile: true, profileResponse: action.payload, loadingDetail: false, };

    case PROFILE_FAIL:
      return { ...INITIAL_STATE, profile: false, loadingDetail: false,isLoggedOut: false  };
    case LOGOUT:
      Actions.pop();
      return { ...INITIAL_STATE, profile: false, profileResponse: {},loadingDetail: false,isLoggedOut: true  };
      break;
    default:
      return state;
  }
}
