import React, { useEffect, useCallback, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import userService from "../../services/user.service";
import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAIL,
  LOADING,
  SET_COUNT,
  LOADED,
  initialState as initialListState,
  reducer as listReducer,
  REFRESH_LIST,
  ERROR,
} from "../../abstract_structures/list";
import {
  UPDATE_START_END_INDEX,
  initialState as initialPaginationState,
  reducer as paginationReducer,
  getStartAndEndIndex,
  UPDATE_PAGINATION_INFO,
} from "../../abstract_structures/paginator";
import ListComponent from "../../components/List";

function GameListContainer() {
  const PAGINATION_OFFSET = 5;
  const PAGE_SIZE = 12;
  const location = useLocation();
  const [listState, listDispatch] = useReducer(listReducer, initialListState);
  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  const [listQuery, setListQuery] = useState({ page: 1, pagesize: PAGE_SIZE });

  const getFetchList = useCallback(async () => {
    listDispatch({ type: FETCH_INIT });
    listDispatch({ type: LOADING });
    try {
      const response = await userService.getApiList(
        location.pathname,
        listQuery
      );
      listDispatch({ type: SET_COUNT, payload: response.data.count });
      listDispatch({ type: REFRESH_LIST, payload: response.data.results });
      listDispatch({ type: FETCH_SUCCESS });
      listDispatch({ type: LOADED });
      // pagination dispatch
      const currentPage =
        typeof listQuery.page === "string"
          ? Math.floor(
              (response.data.count > 0 ? response.data.count - 1 : 0) /
                listQuery.pagesize
            ) + 1
          : listQuery.page;
      paginationDispatch({
        type: UPDATE_PAGINATION_INFO,
        payload: {
          currentPage: currentPage,
          pageSize: listQuery.pagesize,
          offset: PAGINATION_OFFSET,
          count: response.data.count,
        },
      });
      const { start, end } = getStartAndEndIndex(
        currentPage,
        listQuery.pagesize,
        PAGINATION_OFFSET,
        response.data.count
      );
      paginationDispatch({
        type: UPDATE_START_END_INDEX,
        payload: { start: start, end: end },
      });
    } catch (error) {
      listDispatch({ type: FETCH_FAIL });
      listDispatch({ type: LOADED });
      if (error.response && error.response.data) {
        listDispatch({ type: ERROR, payload: error.response.data });
        console.log(error.response.data);
      }
      console.error(error);
    }
  }, [listQuery, location.pathname]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchList();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchList]);
  return <ListComponent posts={listState.list} />; // temp
}

export default GameListContainer;
