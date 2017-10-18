import {
  GET_AUDIO_TOUR, PURCHASED_TOURS, GET_ALL_CONTENT
} from '../../constants';

export const GET_AUDIO_TOURS = 'get_audio_tours';
export const GET_AUDIO_TOURS_FAILS = ' GET_AUDIO_TOURS_FAILS';
export const LOAD_MORE = ' LOAD_MORE';
export const GET_PURCHASED_TOURS = 'get_purchased_tours';
export const GET_PURCHASED_TOURS_FAILS = 'get_purchased_tours_fails';
export const START_LOADING_PURCHASED = 'start_loading_purchased';
export const LOAD_INITIAL = 'load_initial';

export const getAudioTours = (page) => {
  return function (dispatch) {
    fetch(GET_AUDIO_TOUR + page + '&per_page=10')
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_AUDIO_TOURS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_AUDIO_TOURS_FAILS,
        });
        alert(error);
      });
  };
};
export const getPurchasedTours = (userToken) => {

  return function (dispatch) {
    console.log(PURCHASED_TOURS + userToken);
    fetch(PURCHASED_TOURS + userToken)
      .then(function(response) {
        console.log(response);
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_PURCHASED_TOURS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PURCHASED_TOURS_FAILS,
        });
        alert(error);
      });
  };
};
export const change = () => {
  return {
    type: GET_AUDIO_TOURS_FAILS,
  };
};
export const loadPurchased = () => {
  return {
    type: START_LOADING_PURCHASED,
  };
};
export const loadMoreApi = () => {
  return {
    type: LOAD_MORE,
  };
};
export const loadInitial = () => {
  return {
    type: LOAD_INITIAL,
  };
};
