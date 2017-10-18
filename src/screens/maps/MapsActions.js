import {
  GET_MAP_DATA
} from '../../constants';

export const GET_MAP_INFO = 'get_maps_info';
export const GET_MAP_INFO_FAILS = ' GET_MAP_INFO_FAILS';
export const LOAD_INITIAL_MAP ='LOAD_INITIAL_MAP';
export const getMapsInfo = (page) => {
  return function (dispatch) {
    fetch(GET_MAP_DATA)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("MAP DATA",responseJson);
        dispatch({
          type: GET_MAP_INFO,
          payload: responseJson,
        });
      })
      .catch((error) => {
          console.log("MAPerror",responseJson);
        dispatch({
          type: GET_MAP_INFO_FAILS,
        });
        alert(error);
      });
  };
};
export const change = () => {
  return {
    type: GET_MAP_INFO_FAILS,
  };
};
export const loadInitialMap = () => {
  return {
    type: LOAD_INITIAL_MAP,
  };
};
