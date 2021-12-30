export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

export const initalState = {
  message: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
}
