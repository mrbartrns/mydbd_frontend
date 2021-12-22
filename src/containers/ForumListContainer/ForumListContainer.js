import React, { useState, useEffect, useReducer, useCallback } from "react";
import userService from "../../services/user.service";
import ForumListArea from "../../components/organisms/ForumListArea";
import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ERROR,
  SET_COUNT,
  REFRESH_LIST,
  initialState as initialPostState,
  reducer as postReducer,
  LOADING,
  LOADED,
} from "../../abstract_structures/list";
import {
  UPDATE_START_END_INDEX,
  initialState as initialPaginationState,
  reducer as paginationReducer,
  getStartAndEndIndex,
  UPDATE_PAGINATION_INFO,
} from "../../abstract_structures/paginator";

function ForumListContainer() {
  const PAGINATION_OFFSET = 5;
  const PAGE_SIZE = 30;
  const [postState, postDispatch] = useReducer(postReducer, initialPostState);
  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  const [listQuery, setListQuery] = useState({ page: 1, pagesize: PAGE_SIZE });

  const getFetchArticleList = useCallback(async () => {
    postDispatch({ type: FETCH_INIT });
    postDispatch({ type: LOADING });
    try {
      // fetch article list
      const response = await userService.getForumList({ ...listQuery });
      postDispatch({ type: SET_COUNT, payload: response.data.count });
      postDispatch({ type: REFRESH_LIST, payload: response.data.results });
      postDispatch({ type: FETCH_SUCCESS });
      postDispatch({ type: LOADED });
      //pagination dispatch
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
      postDispatch({ type: FETCH_FAIL });
      postDispatch({ type: LOADED });
      if (error.response && error.response.data) {
        postDispatch({ type: ERROR, payload: error.response.data });
        console.log(error.response.data);
      }
      console.error(error);
    }
  }, [listQuery]);

  const onNext = useCallback(() => {
    setListQuery((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  }, []);

  const onPrev = useCallback(() => {
    setListQuery((prev) => {
      return {
        ...prev,
        page: prev.page - 1,
      };
    });
  }, []);

  const goTo = useCallback((index) => {
    setListQuery((prev) => {
      return {
        ...prev,
        page: index,
      };
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchArticleList();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchArticleList]);

  return (
    <ForumListArea
      postState={postState}
      paginationState={paginationState}
      onPrev={onPrev}
      onNext={onNext}
      goTo={goTo}
    />
  );
}

export default ForumListContainer;
