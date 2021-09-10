import { combineReducers } from "redux";
import authReducer from "./auth";
import messageReducer from "./message";
import paginationReducer from "./pagination";

export default combineReducers({
  authReducer,
  messageReducer,
  paginationReducer,
});
