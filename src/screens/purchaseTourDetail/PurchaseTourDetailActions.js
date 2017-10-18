import {
  PURCHASE_DETAIL,
} from '../../constants';

export const GET_PURCHASE_TOURS_DETAIL = 'get_purchase_tour_detail';
export const GET_PURCHASE_TOURS_DETAIL_FAILS = ' GET_PURCHASE_TOURS_DETAIL_FAILS';
export const LOAD_NEW = 'load_new';

export const getPurchaseTourDetail = (tourId, userToken) => {
  return function (dispatch) {
    console.log("Detail url",PURCHASE_DETAIL + tourId + '.json'+'?user_token=' + userToken);
    fetch(PURCHASE_DETAIL + tourId + '.json'+'?user_token=' + userToken)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("P resp",responseJson);
        dispatch({
          type: GET_PURCHASE_TOURS_DETAIL,
          payload: responseJson,
        });
      })
      .catch((error) => {
        console.log("P Error",error);
        dispatch({
          type: GET_PURCHASE_TOURS_DETAIL_FAILS,
        });
        alert(error);
      });
  }
}

export const change = () => {
  return {
    type: GET_PURCHASE_TOURS_DETAIL_FAILS,
  };
};

export const loadNew = () => {
  return {
    type: LOAD_NEW,
  };
};
