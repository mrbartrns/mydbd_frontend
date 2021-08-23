/**
 * 헤더의 랜더링 여부 또는 유저 메뉴 나타남 여부 등을 관리한다.
 * 유저 관련, 회원 인증 관련
 */
import { Map } from "immutable";
import { handleActions, createAction } from "redux-actionss";

const SET_HEADER_VISIBILITY = "base/SET_HEADER_VISIBILITY";

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible

const initialState = Map({
  header: Map({
    visible: true,
  }),
});

export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) => {
      state.setIn(["header", "visible"], action.payload);
    },
  },
  initialState
);
