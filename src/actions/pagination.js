import {
  UPDATE_CURRENT_PAGE,
  UPDATE_START_END_PAGE,
  UPDATE_TOTAL_COUNT,
  UPDATE_TOTAL_PAGE,
} from "./types";

// TODO: 모든 action 분리
export const setCurrentPage = (pageNumber) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_PAGE, payload: pageNumber });
};

export const setStartEndPage = () => (dispatch) => {
  dispatch({ type: UPDATE_START_END_PAGE });
};

export const setTotalCount = (count) => (dispatch) => {
  dispatch({ type: UPDATE_TOTAL_COUNT, payload: count });
};

export const setTotalPage = () => (dispatch) => {
  dispatch({ type: UPDATE_TOTAL_PAGE });
};

export const updatePaginator = (pageNumber, totalCount) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_PAGE, payload: pageNumber });
  dispatch({ type: UPDATE_TOTAL_COUNT, payload: totalCount });
  dispatch({ type: UPDATE_TOTAL_PAGE });
  dispatch({ type: UPDATE_START_END_PAGE });
};
