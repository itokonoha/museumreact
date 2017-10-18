import {
  TOUR_DETAIL,
  BUY_FREE_TOUR
} from '../../constants'
export const GET_AUDIO_TOURS_DETAIL = 'get_audio_tour_detail';
export const GET_AUDIO_TOURS_DETAIL_FAILS = ' GET_AUDIO_TOUR_DETAIL_FAILS';
export const LOAD_NEW = 'load_new';
export const BUY_FREE = 'buy_free';
export const BUY_FREE_FAIL = 'buy_free_fail';
export const START_PURCHASE_LOAD = 'start_purchase_laoding';
export const STOP_PURCHASE_LOAD = 'stop_purchase_laoding';
export const getAudioTourDetail = (tourId,userToken) => {
  return function(dispatch) {
    var url = TOUR_DETAIL+tourId+'.json'+userToken;
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {

        dispatch({
          type: GET_AUDIO_TOURS_DETAIL,
          payload: responseJson
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_AUDIO_TOURS_DETAIL_FAILS
        });

        alert(error);
      });
  }
}
export const buyFreeTour = (tourId, userToken) => {
  var params = {
    'user_token': userToken,
  };

  var formData = new FormData();

  for (var k in params) {
    formData.append(k, params[k]);
  }

  var request = {
    method: 'POST',
    body: formData,
  };
  return function(dispatch) {
    fetch(BUY_FREE_TOUR + tourId + '/orders', request)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: BUY_FREE,
          payload: responseJson
        });
      })
      .catch((error) => {
        dispatch({
          type: BUY_FREE_FAIL
        });
        alert(error);
      });
  }
}

export const change = () => {
  return {
    type: GET_AUDIO_TOURS_DETAIL_FAILS
  }
};
export const showLoading = () => {
  return {
    type: START_PURCHASE_LOAD
  }
};
export const stopLoading = () => {
  return {
    type: STOP_PURCHASE_LOAD
  }
};
export const loadNew = () =>{
  return function(dispatch) {
    dispatch({
      type: LOAD_NEW
    });
  }
};
