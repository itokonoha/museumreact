import { GET_QUESTION_SUCCESS, GET_QUESTION_FAILS, LOAD_QUESTION_CONTENT_DATA, PULL_REFRESH_QUESTIONS  } from './QuestionsActions';
const INITIAL_STATE = { questionsData: [], loading: true, loadMore: false, pullToRefresh: false };

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_QUESTION_SUCCESS:
      return { ...state,
        questionsData: state.questionsData.concat(action.payload),
        loading: false,
        loadMore: false,
        initialPage: 0,
        pullToRefresh: false,
       };
    case GET_QUESTION_FAILS:
      return { ...state, loading: false, loadMore: false, pullToRefresh: false };
    case LOAD_QUESTION_CONTENT_DATA:
      return { ...state, loadMore: true, pullToRefresh: false };
    case PULL_REFRESH_QUESTIONS:
      return { ...state, loadMore: true, pullToRefresh: true, questionsData: [], loading: false };
    default:
      return state;
  }
};
