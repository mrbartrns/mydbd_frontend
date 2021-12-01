import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

import {
  COMMENT_INPUT_INIT,
  CHANGE_INPUT,
  PUSH_COMMENTS,
  REFRESH_COMMENTS,
  POST_COMMENT,
  SET_COUNT,
  COMMENT_LOADING,
  COMMENT_LOADED,
  COMMENT_FETCH_INIT,
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAIL,
  COMMENT_ERROR,
  commentState,
  commentReducer,
} from "../abstractStructures/comment";

function ForumDetailTemplate(props) {
  const location = useLocation();
  const history = useHistory();
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userLikeController, setUserLikeController] = useState({
    like: false,
    dislike: false,
  });
  const [articleLikeCount, setArticleLikeCount] = useState(0);
  const [articleDislikeCount, setArticleDislikeCount] = useState(0);
  const [state, dispatch] = useReducer(commentReducer, commentState);
  const [commentQuery, setCommentQuery] = useState({
    query: { cp: 1, pagesize: 10 },
    refresh: true,
  });

  const getFetchComments = useCallback(async () => {
    dispatch({ type: COMMENT_LOADING });
    try {
      const response = await userService.getArticleCommentList(
        location.pathname,
        { ...commentQuery.query }
      );
      dispatch({ type: SET_COUNT, payload: response.data.count });
      if (commentQuery.refresh) {
        dispatch({ type: REFRESH_COMMENTS, payload: response.data.results });
      } else {
        dispatch({ type: PUSH_COMMENTS, payload: response.data.results });
      }
      dispatch({ type: COMMENT_FETCH_SUCCESS });
      dispatch({ type: COMMENT_LOADED });
    } catch (error) {
      dispatch({ type: COMMENT_FETCH_FAIL });
      if (error.response && error.response.data) {
        dispatch({ type: COMMENT_ERROR, payload: error.response.data });
      }

      dispatch({ type: COMMENT_LOADED });
    }
  }, [location.pathname, commentQuery]);

  const onChange = useCallback((e, parent = null) => {
    dispatch({
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
        // dispatch({ type: POST_COMMENT, payload: response.data });
        dispatch({ type: SET_COUNT, payload: index + 1 });
        dispatch({
          type: POST_COMMENT,
          payload: { comment: response.data, index: index },
        });
        dispatch({ type: COMMENT_INPUT_INIT });
      } catch (error) {
        if (error.response && error.response.data) {
          dispatch({ type: COMMENT_ERROR, payload: error.response.data });
        }
      }
    },
    [location.pathname]
  );

  function toggleLike() {
    const userController = { ...userLikeController };
    if (userController.dislike) {
      userController.dislike = false;
      setArticleDislikeCount(
        articleDislikeCount > 0 ? articleDislikeCount - 1 : 0
      );
    }
    userController.like = !userLikeController.like;
    if (userController.like) {
      setArticleLikeCount(articleLikeCount + 1);
    } else {
      setArticleLikeCount(articleLikeCount > 0 ? articleLikeCount - 1 : 0);
    }
    setUserLikeController(userController);
    userService
      .toggleArticleLike(location.pathname, { ...userController })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleDislike() {
    const userController = { ...userLikeController };
    if (userController.like) {
      userController.like = false;
      setArticleLikeCount(articleLikeCount > 0 ? articleLikeCount - 1 : 0);
    }
    userController.dislike = !userLikeController.dislike;
    if (userController.dislike) {
      setArticleDislikeCount(articleDislikeCount + 1);
    } else {
      setArticleDislikeCount(
        articleDislikeCount > 0 ? articleDislikeCount - 1 : 0
      );
    }
    setUserLikeController(userController);
    // here goes api.post
    userService
      .toggleArticleLike(location.pathname, { ...userController })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }

  // Article Detail useEffect
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoaded(false);
      userService
        .getForumArticle(location.pathname)
        .then((response) => {
          setArticle(response.data);
          setUserLikeController({
            like: response.data.user_liked,
            dislike: response.data.user_disliked,
          });
          setArticleLikeCount(response.data.like_count);
          setArticleDislikeCount(response.data.dislike_count);
          setLoaded(true);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            history.go(0);
          }
          setLoaded(true);
          console.error(error);
        });
    }
    return () => {
      mounted = false;
    };
  }, [location.pathname, history]);

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
    loaded && (
      <ForumDetailComponent
        article={article}
        articleLikeCount={articleLikeCount}
        articleDislikeCount={articleDislikeCount}
        toggleLike={toggleLike}
        toggleDislike={toggleDislike}
        userLikeController={userLikeController}
        onChange={onChange}
        onSubmit={onSubmit}
        state={state}
        getFetchComments={getFetchComments}
        setCommentQuery={setCommentQuery}
      />
    )
  );
}

export default ForumDetailTemplate;
