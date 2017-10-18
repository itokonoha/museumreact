import { GET_MORE_SUCCESS, GET_MORE_FAIL } from './MoreActions';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = { moreResponse: {}, loadingDetail: true };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MORE_SUCCESS:
      return { ...state, moreResponse: action.payload, loadingDetail: false, };

    case GET_MORE_FAIL:
      return { ...INITIAL_STATE, moreResponse: {}, loadingDetail: false  };
    default:
      return state;
  }
}
