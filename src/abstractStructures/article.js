export const SET_ID = "SET_ID";
export const SET_TITLE = "SET_TITLE";
export const SET_CONTENT = "SET_CONTET";
export const SET_HIT = "SET_HIT";
export const SET_TAGS = "SET_TAGS";
export const FETCH_ARTICLE = "FETCH_ARTICLE";
export const SET_CREATED_AT = "SET_CREATED_AT";
export const SET_MODIFIED_AT = "SET_MODIFIED_AT";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const ARTICLE_FETCH_SUCCESS = "ARTICLE_FETCH_SUCCESS";
export const ARTICLE_FETCH_INIT = "ARTICLE_FETCH_INIT";
export const ARTICLE_ERROR = "ARTICLE_ERROR";

export const initialState = {
  id: null,
  author: null,
  title: null,
  content: null,
  tags: [],
  hit: 0,
  createdAt: null,
  modifiedAt: null,
  fetchSuccess: false,
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };
    case SET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case SET_HIT:
      return {
        ...state,
        hit: action.payload,
      };
    case SET_TAGS:
      return {
        ...state,
        tags: [...action.payload],
      };
    case SET_CREATED_AT:
      return {
        ...state,
        createdAt: action.payload,
      };
    case SET_MODIFIED_AT:
      return {
        ...state,
        modifiedAt: action.payload,
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        id: action.payload.id,
        author: action.payload.author,
        title: action.payload.title,
        content: action.payload.content,
        tags: [...action.payload.tags],
        count: action.payload.count,
        createdAt: action.payload.createdAt,
        modifiedAt: action.payload.modifiedAt,
      };
    case ARTICLE_FETCH_INIT:
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
    case ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        fetchSuccess: true,
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        fetchSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
