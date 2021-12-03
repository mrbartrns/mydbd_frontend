import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

import {
  COMMENT_INPUT_INIT,
  CHANGE_INPUT,
  REFRESH_COMMENTS,
  POST_COMMENT,
  REMOVE_COMMENT,
  SET_COUNT,
  LOADED as COMMENT_LOADED,
  COMMENT_FETCH_INIT,
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAIL,
  COMMENT_ERROR,
  UPDATE_COMMENT,
  initialiState as initialCommentState,
  reducer as commentReducer,
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

function ForumDetailTemplate(props) {
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [articleState, articleDispatch] = useReducer(
    articleReducer,
    initialArticleState
  );
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    initialCommentState
  );
  const [voteState, voteDispatch] = useReducer(voteReducer, initialVoteState);

  const [commentQuery, setCommentQuery] = useState({ cp: 1, pagesize: 10 });

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
      setArticle(response.data);
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
      setLoaded(true);
    } catch (error) {
      if (error.response && error.response.data) {
        articleDispatch({ type: ARTICLE_ERROR, payload: error.response.data });
        articleDispatch({ type: ARTICLE_LOADED });
      }
      setLoaded(true);
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
    } catch (error) {
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
    async (comment, index) => {
      try {
        const response = await userService.postArticleComment(
          location.pathname,
          comment
        );
        commentDispatch({ type: SET_COUNT, payload: index + 1 });
        commentDispatch({
          type: POST_COMMENT,
          payload: { comment: response.data, index: index },
        });
        commentDispatch({ type: COMMENT_INPUT_INIT });
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
      const response = userService.updateComment(commentId, comment);
      commentDispatch({ type: UPDATE_COMMENT, payload: response.data });
    } catch (error) {
      if (error.response && error.response.data) {
        commentDispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }
    }
  }, []);

  const onDelete = useCallback(async (commentId) => {
    try {
      await userService.deleteComment(commentId);
      commentDispatch({ type: REMOVE_COMMENT, payload: commentId });
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
      article={article}
      articleState={articleState}
      onLike={onLike}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onChange={onChange}
      onSubmit={onSubmit}
      commentState={commentState}
      voteState={voteState}
      setCommentQuery={setCommentQuery}
    />
  );
}

export default ForumDetailTemplate;
