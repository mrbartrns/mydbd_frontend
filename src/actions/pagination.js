import {
  UPDATE_CURRENT_PAGE,
  UPDATE_SLICE_END_INDEX,
  UPDATE_SLICE_START_INDEX,
  UPDATE_START_END_PAGE,
  UPDATE_TOTAL_COUNT,
  UPDATE_TOTAL_PAGE,
} from "./types";

// TODO: make setStartIndex and EndIndex action
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

// these actions are for comments
export const updateSliceStartIndex = () => (dispatch) => {
  dispatch({ type: UPDATE_SLICE_START_INDEX });
};

export const updateSliceEndIndex = () => (dispatch) => {
  dispatch({ type: UPDATE_SLICE_END_INDEX });
};

export const updatePaginator = (pageNumber, totalCount) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_PAGE, payload: pageNumber });
  dispatch({ type: UPDATE_TOTAL_COUNT, payload: totalCount });
  dispatch({ type: UPDATE_TOTAL_PAGE });
  dispatch({ type: UPDATE_START_END_PAGE });
};
