export const FETCH_INIT = "FETCH_INIT";
export const DELETE_ITEM = "DELETE_ITEM";
export const LOADING = "LOADING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const REFRESH_LIST = "REFRESH_LIST";
export const ERROR = "ERROR";
export const SET_COUNT = "SET_COUNT";
export const LOADED = "LOADED";

export const initialState = {
  count: 0,
  list: [],
  fetchSuccess: false,
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case REFRESH_LIST:
      return {
        ...state,
        list: [...action.payload],
      };
    case FETCH_INIT:
      return {
        ...state,
        loading: false,
        error: null,
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
    case FETCH_SUCCESS:
      return {
        ...state,
        fetchSuccess: true,
        loading: false,
        error: null,
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetchSuccess: false,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
