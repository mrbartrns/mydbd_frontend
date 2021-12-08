export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SLICE_START_INDEX = "SET_SLICE_START_INDEX";
export const SET_SLICE_END_INDEX = "SET_SLICE_END_INDEX";
export const SET_PAGINATION_OFFSET = "SET_PAGINATION_OFFSET";
export const SET_PAGE_SIZE = "SET_PAGE_SIZE";
export const UPDATE_START_END_INDEX = "UPDATE_START_END_INDEX";
export const UPDATE_PAGINATION_INFO = "UPDATE_PAGINATION_INFO";

export const initialState = {
  count: null,
  pageSize: null,
  currentPage: null,
  startIndex: null,
  endIndex: null,
  offset: null,
};

function getCurrentIndex(currentPage) {
  return currentPage - 1;
}

function getOffsetCount(count) {
  return count > 0 ? count - 1 : 0;
}

function getTotalPageCount(offsetCount, pageSize) {
  return Math.floor(offsetCount / pageSize) + 1;
}

export function getStartAndEndIndex(currentPage, pageSize, offset, count) {
  const currentIndex = getCurrentIndex(currentPage);
  const offsetCount = getOffsetCount(count);
  const totalPageCount = getTotalPageCount(offsetCount, pageSize); // total count of pages
  const start = Math.floor(currentIndex / offset);
  const end = Math.floor(currentIndex / offset) + offset;
  return {
    start: start,
    end: end <= totalPageCount ? end : totalPageCount,
  };
}

export function getNextOffsetStep(currentPage, pageSize, offset, count) {
  const currentIndex = getCurrentIndex(currentPage);
  const offsetCount = getOffsetCount(count);
  const totalPageCount = getTotalPageCount(offsetCount, pageSize);
  return currentIndex + offset < totalPageCount
    ? currentIndex + offset
    : totalPageCount - 1;
}

export function getPrevOffsetStep(currentPage, offset) {
  const currentIndex = getCurrentIndex(currentPage);
  return currentIndex - offset > 0 ? currentIndex - offset : 0;
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    case SET_SLICE_START_INDEX:
      return {
        ...state,
        startIndex: action.payload,
      };
    case SET_SLICE_END_INDEX:
      return {
        ...state,
        endIndex: action.payload,
      };
    case UPDATE_START_END_INDEX:
      return {
        ...state,
        startIndex: action.payload.start,
        endIndex: action.payload.end,
      };
    case UPDATE_PAGINATION_INFO:
      return {
        ...state,
        count: action.payload.count,
        pageSize: action.payload.pageSize,
        offset: action.payload.offset,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
}
