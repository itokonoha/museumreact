import {
  TABS
} from './constants';

export const GET_TABS_SUCCESS = 'GET_TABS_SUCCESS';
export const GET_TABS_FAILS = 'GET_TABS_FAILS';

export const getTabs = () => {
  return function (dispatch) {
    console.log('Request',TABS);

    fetch(TABS)
      .then(function(response) {
        console.log('Resp Tabs',response);
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_TABS_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_TABS_FAILS,
        });
        alert(error);
      });
  };
};
