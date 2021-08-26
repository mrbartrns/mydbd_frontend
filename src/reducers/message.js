import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};
export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: typeof payload === String ? payload : { ...payload },
      };
    case CLEAR_MESSAGE:
      return {};
    default:
      return state;
  }
}
