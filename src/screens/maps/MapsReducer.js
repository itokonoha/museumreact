import { GET_MAP_INFO, GET_MAP_INFO_FAILS, LOAD_INITIAL_MAP } from './MapsActions';

const INITIAL_STATE = {  mapTours: [], loadingDetail: true };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MAP_INFO:
      return { ...state,
        mapTours: action.payload,
        loadingDetail: false
      };
    case GET_MAP_INFO_FAILS:
      return { ...state, loadingDetail: false };
    case LOAD_INITIAL_MAP:
      return { ...state, loadingDetail: true,  mapTours: []};
      break;
    default:
      return state;
  }
};
