import {
  GET_QUESTIONS_DATA
} from '../../../constants';

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILS = 'GET_QUESTION_FAILS';
export const LOAD_QUESTION_CONTENT_DATA = "LOAD_QUESTION_CONTENT_DATA";
export const PULL_REFRESH_QUESTIONS = 'PULL_REFRESH_DISCUSSION'

export const getQuestionsData = (page,user_token) => {
  return function (dispatch) {
    console.log(GET_QUESTIONS_DATA + page + '&per_page=10');
    fetch(GET_QUESTIONS_DATA + page + '&per_page=10' + '&user_token='+user_token)
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((responseJson) => {
        dispatch({
          type: GET_QUESTION_SUCCESS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_QUESTION_FAILS,
        });
        alert(error);
      });
  };
};
export const loadMoreQuestions= () => {
  return {
    type: LOAD_QUESTION_CONTENT_DATA,
  };
};
export const pullRefreshQuestions= () => {
  return {
    type: PULL_REFRESH_QUESTIONS,
  };
};
