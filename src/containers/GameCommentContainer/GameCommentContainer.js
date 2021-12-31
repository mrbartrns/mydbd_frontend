import React, { useCallback, useState, useReducer, useEffect } from "react";
import setAutoHeight from "../../common/set-auto-height";
import {
  COMMENT_INPUT_INIT,
  CHANGE_INPUT,
  REFRESH_COMMENTS,
  SET_COUNT,
  LOADED as COMMENT_LOADED,
  LOADING as COMMENT_LOADING,
  COMMENT_FETCH_INIT,
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAIL,
  COMMENT_ERROR,
  UPDATE_COMMENT,
  INCREASE_COUNT,
  initialState as initialCommentState,
  reducer as commentReducer,
} from "../../abstract_structures/comment";
import {
  UPDATE_START_END_INDEX,
  initialState as initialPaginationState,
  reducer as paginationReducer,
  getStartAndEndIndex,
  UPDATE_PAGINATION_INFO,
} from "../../abstract_structures/paginator";
import { useLocation } from "react-router-dom";
import userService from "../../services/user.service";
import GameCommentArea from "../../components/organisms/GameCommentArea/GameCommentArea";
import { connect } from "react-redux";

function GameCommentContainer({ parent }) {
  const PAGINATION_OFFSET = 5;
  const PAGE_SIZE = 10;
  const location = useLocation();
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    initialCommentState
  );
  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );
  const [commentQuery, setCommentQuery] = useState({
    cp: 1,
    pagesize: PAGE_SIZE,
    parent: parent ? parent : null,
  }); // TODO: add sort

  const getFetchComments = useCallback(async () => {
    commentDispatch({ type: COMMENT_FETCH_INIT });
    commentDispatch({ type: COMMENT_LOADING });
    try {
      const response = await userService.getCommentList(
        location.pathname,
        commentQuery
      );
      commentDispatch({ type: SET_COUNT, payload: response.data.count });
      commentDispatch({
        type: REFRESH_COMMENTS,
        payload: response.data.results,
      });
      commentDispatch({ type: COMMENT_FETCH_SUCCESS });
      commentDispatch({ type: COMMENT_LOADED });
      /* pagination dispatch */
      const currentPage =
        typeof commentQuery.cp === "string"
          ? Math.floor(
              (response.data.count > 0 ? response.data.count - 1 : 0) /
                commentQuery.pagesize
            ) + 1
          : commentQuery.cp;
      paginationDispatch({
        type: UPDATE_PAGINATION_INFO,
        payload: {
          currentPage: currentPage,
          pageSize: commentQuery.pagesize,
          offset: PAGINATION_OFFSET,
          count: response.data.count,
        },
      });
      const { start, end } = getStartAndEndIndex(
        currentPage,
        commentQuery.pagesize,
        PAGINATION_OFFSET,
        response.data.count
      );
      paginationDispatch({
        type: UPDATE_START_END_INDEX,
        payload: { start: start, end: end },
      });
    } catch (error) {
      commentDispatch({ type: COMMENT_FETCH_FAIL });
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }

      commentDispatch({ type: COMMENT_LOADED });
    }
  }, [location.pathname, commentQuery]);

  const onChange = useCallback((e, parent = null) => {
    setAutoHeight(e);
    commentDispatch({
      type: CHANGE_INPUT,
      payload: { parent: parent, content: e.target.value },
    });
  }, []);

  const onSubmit = useCallback(
    async (comment) => {
      try {
        await userService.postComment(location.pathname, comment);
        commentDispatch({ type: INCREASE_COUNT });
        commentDispatch({ type: COMMENT_INPUT_INIT });
        // after submit, goto page 1
        setCommentQuery((c) => {
          return {
            ...c,
            cp: 1,
          };
        });
      } catch (error) {
        if (error.response && error.response.data) {
          commentDispatch({
            type: COMMENT_ERROR,
            payload: error.response.data,
          });
        }
        console.error(error);
      }
    },
    [location.pathname]
  );

  const onUpdate = useCallback(async (commentId, comment) => {
    try {
      const response = await userService.updateComment(commentId, comment);
      commentDispatch({ type: UPDATE_COMMENT, payload: response.data });
    } catch (error) {
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }
    }
  }, []);

  const onDelete = useCallback(async (commentId) => {
    try {
      const response = await userService.deleteComment(commentId);
      commentDispatch({ type: UPDATE_COMMENT, payload: response.data });
    } catch (error) {
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }
    }
  }, []);

  const onNext = useCallback(() => {
    setCommentQuery((prev) => {
      return {
        ...prev,
        cp: prev.cp + 1,
      };
    });
  }, []);

  const onPrev = useCallback(() => {
    setCommentQuery((prev) => {
      return {
        ...prev,
        cp: prev.cp - 1,
      };
    });
  }, []);

  const goTo = useCallback((index) => {
    setCommentQuery((prev) => {
      return {
        ...prev,
        cp: index,
      };
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchComments();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchComments]);
  return (
    <GameCommentArea
      commentState={commentState}
      paginationState={paginationState}
      onNext={onNext}
      onPrev={onPrev}
      goTo={goTo}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onSubmit={onSubmit}
      onChange={onChange}
      parent={parent}
    />
  );
}

export default GameCommentContainer;
