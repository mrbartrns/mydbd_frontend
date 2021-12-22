export const CHANGE_INPUT = "CHANGE_INOUT";
export const COMMENT_INPUT_INIT = "COMMENT_INPUT_INIT";
export const PUSH_COMMENTS = "PUSH_COMMENTS";
export const REFRESH_COMMENTS = "REFRESH_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const SET_COUNT = "SET_COUNT";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const COMMENT_FETCH_INIT = "COMMENT_FETCH_INIT";
export const COMMENT_FETCH_SUCCESS = "COMMENT_FETCH_SUCCESS";
export const COMMENT_FETCH_FAIL = "COMMENT_FETCH_FAIL";
export const COMMENT_ERROR = "COMMENT_ERROR";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const POST_SUB_COMMENT = "POST_SUB_COMMENT";

export const initialState = {
  inputs: {
    parent: null,
    content: "",
  },
  count: 0,
  comments: [],
  fetchSuccess: false,
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case COMMENT_INPUT_INIT: {
      return {
        ...state,
        inputs: {
          parent: null,
          content: "",
        },
      };
    }
    case CHANGE_INPUT:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          parent: action.payload.parent,
          content: action.payload.content,
        },
      };
    case INCREASE_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREASE_COUNT:
      return {
        ...state,
        count: state.count > 0 ? state.count - 1 : 0,
      };
    case PUSH_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
      };
    case REFRESH_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case POST_SUB_COMMENT:
      const reversedIndex = [...state.comments]
        .reverse()
        .findIndex(
          (el) => (el.parent ? el.parent : el.id) === action.payload.parent
        );
      const count = state.comments.length;
      const index = reversedIndex >= 0 ? count - reversedIndex : reversedIndex;
      return {
        ...state,
        comments:
          index > -1
            ? [
                ...state.comments.slice(0, index),
                action.payload,
                ...state.comments.slice(index),
              ]
            : [...state.comments],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.reduce((updatedComments, comment) => {
          comment.id === action.payload.id
            ? updatedComments.push(action.payload)
            : updatedComments.push(comment);
          return updatedComments;
        }, []),
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADED:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_FETCH_INIT:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COMMENT_FETCH_SUCCESS:
      return {
        ...state,
        fetchSuccess: true,
        error: null,
      };
    case COMMENT_FETCH_FAIL:
      return {
        ...state,
        fetchSuccess: false,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
