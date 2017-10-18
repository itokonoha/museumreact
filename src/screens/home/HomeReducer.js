import { SHOW_USER, USER_FAIL, HOME_LOADING } from './HomeActions';

const INITIAL_STATE = { homeScreenData: {}, load: true, data: false };
export default (state = INITIAL_STATE, action) => {
      
  switch (action.type) {

    case SHOW_USER:
      console.log("Home Success ");
      return { ...state, homeScreenData: action.payload, load: false };
    case USER_FAIL:
      console.log("Home FAIL ");
      return { ...state, load: true };
    case HOME_LOADING:
      return { ...state, load: false };
    default:
      return state;
  }
};
