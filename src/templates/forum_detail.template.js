import React, { useState, useEffect, useReducer } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          parent: action.comment.parent,
          content: action.comment.content,
        },
      };
    case "PUSH_COMMENT":
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
      };
    case "REFRESH_COMMENTS":
      return {
        ...state,
        comments: [...action.comments],
      };
    case "POST_COMMENT":
      return {
        ...state,
        comments: [
          ...state.comments.slice(0, action.idx),
          action.comment,
          ...state.comments.slice(action.idx),
        ],
      };
    case "REMOVE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.id),
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.count,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_INIT":
      return {
        ...state,
        success: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        success: true,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
}

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

  const initialState = {
    inputs: {
      parent: null,
      content: "",
    },
    count: 0,
    comments: [],
    success: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // function submitComment(e) {
  //   e.preventDefault();
  //   userService
  //     .postArticleComment(location.pathname, {
  //       parent: null,
  //       content: comment,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // }

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
    let mounted = true;
    const queries = { "page-size": 10, cp: 1 };

    if (mounted) {
      dispatch({ type: "LOADING" });
      userService
        .getArticleCommentList(location.pathname, queries)
        .then((response) => {
          dispatch({ type: "SET_COUNT", count: response.data.count });
          dispatch({ type: "PUSH_COMMENT", comments: response.data.results });
          dispatch({ type: "FETCH_SUCCESS" });
        })
        .catch((error) => {
          dispatch({ type: "FETCH_FAIL" });
        })
        .finally(() => {
          dispatch({ type: "LOADED" });
        });
    }
    return () => {
      mounted = false;
      dispatch({ type: "FETCH_INIT" });
    };
  }, [location]);

  console.log(state);

  return (
    loaded && (
      <ForumDetailComponent
        article={article}
        articleLikeCount={articleLikeCount}
        articleDislikeCount={articleDislikeCount}
        toggleLike={toggleLike}
        toggleDislike={toggleDislike}
        userLikeController={userLikeController}
        // handleCommentChange={handleCommentChange}
        // submitComment={submitComment}
      />
    )
  );
}

export default ForumDetailTemplate;
