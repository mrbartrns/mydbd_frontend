export const CHANGE_INPUT = "CHANGE_INOUT";
export const COMMENT_INPUT_INIT = "COMMENT_INPUT_INIT";
export const PUSH_COMMENTS = "PUSH_COMMENTS";
export const REFRESH_COMMENTS = "REFRESH_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const SET_COUNT = "SET_COUNT";
export const COMMENT_LOADING = "COMMENT_LOADING";
export const COMMENT_LOADED = "COMMENT_LOADED";
export const COMMENT_FETCH_INIT = "COMMENT_FETCH_INIT";
export const COMMENT_FETCH_SUCCESS = "COMMENT_FETCH_SUCCESS";
export const COMMENT_FETCH_FAIL = "COMMENT_FETCH_FAIL";
export const COMMENT_ERROR = "COMMENT_ERROR";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const initialiState = {
  inputs: {
    parent: null,
    content: "",
  },
  count: 0,
  commentIdSet: new Set(),
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
        // comments: [
        //   ...new Set([
        //     ...state.comments.slice(0, action.payload.index),
        //     action.payload.comment,
        //     ...state.comments.slice(action.payload.index),
        //   ]),
        // ],
        comments: [
          ...state.comments.slice(0, action.payload.index),
          action.payload.comment,
          ...state.comments.slice(action.payload.index),
        ],
      };
    // TODO: TEST
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
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LOADED:
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
