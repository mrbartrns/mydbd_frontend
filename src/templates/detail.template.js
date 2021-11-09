// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";
import DetailComponent from "../components/Detail/detail.component";
import CommentContainerTemplate from "./comment_container.template";

// css
import "../css/component/detail.component.scss";

function DetailTemplate(props) {
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userLikeController, setUserLikeController] = useState({
    like: false,
    dislike: false,
  });
  const [articleLikeCount, setArticleLikeCount] = useState(0);
  const [articleDislikeCount, setArticleDislikeCount] = useState(0);

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
    UserService.toggleArticleLike(location.pathname, { ...userController })
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
    UserService.toggleArticleLike(location.pathname, { ...userController })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }

  useEffect(() => {
    const source = UserService.getCancelToken();
    const queries = {};
    queries["cancelToken"] = source.token;
    let mounted = true;
    if (mounted) {
      setLoaded(false);
      UserService.getApiDetail(location.pathname).then((response) => {
        setArticle(response.data);
        setUserLikeController({
          like: response.data.user_liked,
          dislike: response.data.user_disliked,
        });
        setArticleLikeCount(response.data.like_count);
        setArticleDislikeCount(response.data.dislike_count);
        setLoaded(true);
        console.log(response.data);
      });
    }
    return () => {
      mounted = false;
      UserService.unsubscribe();
    };
  }, [location]);
  return (
    <div className="content_container">
      <DetailComponent
        post={article}
        loaded={loaded}
        articleLikeCount={articleLikeCount}
        articleDislikeCount={articleDislikeCount}
        toggleLike={toggleLike}
        toggleDislike={toggleDislike}
        userLikeController={userLikeController}
      />
      <CommentContainerTemplate />
    </div>
  );
}

export default DetailTemplate;
