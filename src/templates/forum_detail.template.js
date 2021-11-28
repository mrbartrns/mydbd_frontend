import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

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
  const [comments, setComments] = useState([]);
  const [commentLoaded, setCommentLoaded] = useState(false);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [nextCommentPage, setNextCommentPage] = useState(null);
  const [comment, setComment] = useState("");

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  // if created: refresh
  function submitComment(e) {
    userService
      .postArticleComment(location.pathname, {
        parent: null,
        content: comment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

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
    // here goes api.post
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

  // TODO: Make comment useEffect
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
    if (mounted) {
      setCommentLoaded(false);
      const queries = {};
      if (currentCommentPage === null) {
        queries["cp"] = 1;
        queries["all"] = true;
        userService
          .getArticleCommentList(location.pathname, queries)
          .then((response) => {
            setComments(response.data.results);
            // TODO: 추가적인 조치가 있어야 하는지 확인하기
            setCommentLoaded(true);
          });
      } else {
        queries["cp"] = currentCommentPage;
        userService
          .getArticleCommentList(location.pathname, queries)
          .then((response) => {
            setComments((c) => {
              return [...c, ...response.data.results];
            });
            setNextCommentPage(response.data.next);
            setCommentLoaded(true);
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [location.pathname, currentCommentPage]);
  return (
    loaded && (
      <ForumDetailComponent
        article={article}
        articleLikeCount={articleLikeCount}
        articleDislikeCount={articleDislikeCount}
        toggleLike={toggleLike}
        toggleDislike={toggleDislike}
        userLikeController={userLikeController}
        handleCommentChange={handleCommentChange}
        submitComment={submitComment}
        comments={comments}
        commentLoaded={commentLoaded}
      />
    )
  );
}

export default ForumDetailTemplate;
