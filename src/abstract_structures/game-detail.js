export const FETCH_INIT = "FETCH_INIT";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const REFRESH = "REFRESH";
export const LOADED = "LOADED";

export const initialState = {
  content: null,
  loading: false,
  fetchSuccess: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
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
    case FETCH_SUCCESS:
      return {
        ...state,
        fetchSuccess: true,
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetchSuccess: false,
      };
    case LOADED:
      return {
        ...state,
        loading: false,
      };
    case REFRESH:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
}
