import {
  UPDATE_CURRENT_PAGE,
  UPDATE_START_END_PAGE,
  UPDATE_TOTAL_COUNT,
  UPDATE_TOTAL_PAGE,
} from "../actions/types";
const POST_PER_PAGE = 10;
const PAGE_OFFSET = 5;
const HALF_PAGE_OFFSET = Math.floor(PAGE_OFFSET / 2);

const initialState = {
  currentPage: 1,
  start: 0,
  end: 0,
  count: 0,
  total: 0,
};

export default function paginationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case UPDATE_TOTAL_COUNT:
      return {
        ...state,
        count: payload,
      };
    case UPDATE_TOTAL_PAGE:
      return {
        ...state,
        total: Math.floor(state.count / POST_PER_PAGE) + 1,
      };
    case UPDATE_START_END_PAGE:
      return {
        ...state,
        start:
          state.currentPage - HALF_PAGE_OFFSET >= 1
            ? state.currentPage - HALF_PAGE_OFFSET - 1
            : 0,
        end:
          state.currentPage + HALF_PAGE_OFFSET <= state.total
            ? state.currentPage + HALF_PAGE_OFFSET
            : state.total,
      };
    default:
      return state;
  }
}
