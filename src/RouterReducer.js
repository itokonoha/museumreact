import { GET_TABS_SUCCESS, GET_TABS_FAILS } from './RouterActions';
const INITIAL_STATE = { tabs: {}, loading: true };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_TABS_SUCCESS:
    console.log('ACTION=======',action.type,action.payload);
      return { ...state,
        tabs: action.payload,
        loading: false,
      };
    case GET_TABS_FAILS:
      return { ...state, loading: false, };
    default:
      return state;
  }
};
