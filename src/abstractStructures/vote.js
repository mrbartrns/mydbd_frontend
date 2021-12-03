// 아직은 한번 좋아요 또는 싫어요를 누른 뒤에는 수정할 수 없다.
export const FETCH_LIKES = "FETCH_LIKES";
export const INCREASE_LIKE = "INCREASE_LIKE";
export const INCREASE_DISLIKE = "INCREASE_DISLIKE`";
export const SET_USER_LIKED = "SET_USER_LIKED";
export const VOTE_ERROR = "VOTE_ERROR";

export const initialState = {
  userLiked: false,
  likes: 0,
  dislikes: 0,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_LIKES:
      return {
        ...state,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
      };
    case INCREASE_LIKE:
      return {
        ...state,
        likes: state.userLiked ? state.likes + 1 : state.likes,
      };
    case INCREASE_DISLIKE:
      return {
        ...state,
        dislikes: state.userLiked ? state.dislikes + 1 : state.dislikes,
      };
    case SET_USER_LIKED:
      return {
        ...state,
        userLiked: action.payload,
      };
    case VOTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
