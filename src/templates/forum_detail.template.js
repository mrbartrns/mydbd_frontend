import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

import {
  COMMENT_INPUT_INIT,
  CHANGE_INPUT,
  REFRESH_COMMENTS,
  SET_COUNT,
  LOADED as COMMENT_LOADED,
  COMMENT_FETCH_INIT,
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAIL,
  COMMENT_ERROR,
  UPDATE_COMMENT,
  INCREASE_COUNT,
  initialState as initialCommentState,
  reducer as commentReducer,
  POST_SUB_COMMENT,
} from "../abstractStructures/comment";

import {
  FETCH_LIKES,
  INCREASE_LIKE,
  INCREASE_DISLIKE,
  VOTE_ERROR,
  reducer as voteReducer,
  initialState as initialVoteState,
  SET_USER_LIKED,
} from "../abstractStructures/vote";

import {
  FETCH_ARTICLE,
  ARTICLE_FETCH_INIT,
  ARTICLE_FETCH_SUCCESS,
  LOADED as ARTICLE_LOADED,
  ARTICLE_ERROR,
  initialState as initialArticleState,
  reducer as articleReducer,
} from "../abstractStructures/article";

import {
  UPDATE_START_END_INDEX,
  initialState as initialPaginationState,
  reducer as paginationReducer,
  getStartAndEndIndex,
  UPDATE_PAGINATION_INFO,
} from "../abstractStructures/paginator";

function ForumDetailTemplate(props) {
  const PAGINATION_OFFSET = 5;
  const PAGE_SIZE = 10;
  const location = useLocation();

  const [articleState, articleDispatch] = useReducer(
    articleReducer,
    initialArticleState
  );
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    initialCommentState
  );
  const [voteState, voteDispatch] = useReducer(voteReducer, initialVoteState);
  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initialPaginationState
  );

  const [commentQuery, setCommentQuery] = useState({
    cp: 1,
    pagesize: PAGE_SIZE,
  });
  const [replyFormKey, setReplyFormKey] = useState(null);
  const [updateFormKey, setUpdateFormKey] = useState(null);

  // set Article and pagination
  const getFetchArticle = useCallback(async () => {
    articleDispatch({ type: ARTICLE_FETCH_INIT });
    try {
      const response = await userService.getForumArticle(location.pathname);
      articleDispatch({
        type: FETCH_ARTICLE,
        payload: {
          id: response.data.id,
          author: response.data.author,
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          hit: response.data.hit,
          createdAt: response.data.dt_created,
          modifiedAt: response.data.dt_modified,
        },
      });
      voteDispatch({
        type: FETCH_LIKES,
        payload: {
          likes: response.data.like_count,
          dislikes: response.data.dislike_count,
        },
      });
      voteDispatch({
        type: SET_USER_LIKED,
        payload: {
          userLiked: response.data.user_liked,
          userDisliked: response.data.user_disliked,
        },
      });
      articleDispatch({ type: ARTICLE_FETCH_SUCCESS });
      articleDispatch({ type: ARTICLE_LOADED });
    } catch (error) {
      if (error.response && error.response.data) {
        articleDispatch({ type: ARTICLE_ERROR, payload: error.response.data });
        articleDispatch({ type: ARTICLE_LOADED });
      }
      console.error(error);
    }
  }, [location.pathname]);

  const getFetchComments = useCallback(async () => {
    commentDispatch({ type: COMMENT_FETCH_INIT });
    try {
      const response = await userService.getArticleCommentList(
        location.pathname,
        { ...commentQuery }
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
      // catch error
      commentDispatch({ type: COMMENT_FETCH_FAIL });
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }

      commentDispatch({ type: COMMENT_LOADED });
    }
  }, [location.pathname, commentQuery]);

  const onChange = useCallback((e, parent = null) => {
    commentDispatch({
      type: CHANGE_INPUT,
      payload: { parent: parent, content: e.target.value },
    });
  }, []);

  const onSubmit = useCallback(
    async (comment) => {
      try {
        const response = await userService.postArticleComment(
          location.pathname,
          comment
        );
        commentDispatch({ type: INCREASE_COUNT });
        commentDispatch({ type: COMMENT_INPUT_INIT });
        if (!comment.parent) {
          setCommentQuery((c) => {
            return {
              ...c,
              cp: "last",
            };
          });
        } else {
          commentDispatch({
            type: POST_SUB_COMMENT,
            payload: response.data,
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          commentDispatch({
            type: COMMENT_ERROR,
            payload: error.response.data,
          });
        }
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
    // Refresh current page after requesting delete api
    try {
      const response = await userService.deleteComment(commentId);
      // commentDispatch({ type: REMOVE_COMMENT, payload: commentId });
      commentDispatch({ type: UPDATE_COMMENT, payload: response.data });
    } catch (error) {
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }
    }
  }, []);

  const onLike = useCallback(
    async ({ like, dislike }) => {
      // temp
      if (voteState.userLiked.like || voteState.userLiked.dislike) return;
      if (like) {
        voteDispatch({ type: INCREASE_LIKE });
      } else if (dislike) {
        voteDispatch({ type: INCREASE_DISLIKE });
      }
      try {
        const response = await userService.toggleArticleLike(
          location.pathname,
          {
            like,
            dislike,
          }
        );
        voteDispatch({
          type: SET_USER_LIKED,
          payload: {
            userLiked: response.data.like,
            userDisliked: response.data.dislike,
          },
        });
      } catch (error) {
        if (error.response && error.response.data) {
          voteDispatch({ type: VOTE_ERROR, payload: error.response.data });
        }
      }
    },
    [location.pathname, voteState]
  );

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

  // useEffect
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchArticle();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchArticle]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getFetchComments();
    }
    return () => {
      isMounted = false;
    };
  }, [getFetchComments]);

  return (
    <ForumDetailComponent
      articleState={articleState}
      onLike={onLike}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onChange={onChange}
      onSubmit={onSubmit}
      commentState={commentState}
      voteState={voteState}
      paginationState={paginationState}
      onNext={onNext}
      onPrev={onPrev}
      goTo={goTo}
      replyFormKey={replyFormKey}
      setReplyFormKey={setReplyFormKey}
      updateFormKey={updateFormKey}
      setUpdateFormKey={setUpdateFormKey}
    />
  );
}

export default ForumDetailTemplate;
