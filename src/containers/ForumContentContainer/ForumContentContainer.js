import React, { useEffect, useReducer, useCallback } from "react";
import { useLocation } from "react-router-dom";
import userService from "../../services/user.service";

import {
  FETCH_ARTICLE,
  LOADING as ARTICLE_LOADING,
  ARTICLE_FETCH_INIT,
  ARTICLE_FETCH_SUCCESS,
  LOADED as ARTICLE_LOADED,
  ARTICLE_ERROR,
  initialState as initialArticleState,
  reducer as articleReducer,
} from "../../abstract_structures/article";

import {
  FETCH_LIKES,
  INCREASE_LIKE,
  INCREASE_DISLIKE,
  VOTE_ERROR,
  reducer as voteReducer,
  initialState as initialVoteState,
  SET_USER_LIKED,
} from "../../abstract_structures/vote";
import ForumContent from "../../components/organisms/ForumContent/ForumContent";

function ForumContentContainer() {
  const location = useLocation();
  const [articleState, articleDispatch] = useReducer(
    articleReducer,
    initialArticleState
  );
  const [voteState, voteDispatch] = useReducer(voteReducer, initialVoteState);
  const getFetchArticle = useCallback(async () => {
    articleDispatch({ type: ARTICLE_FETCH_INIT });
    articleDispatch({ type: ARTICLE_LOADING });
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
  const onLike = useCallback(
    async ({ like, dislike }) => {
      // if click either like or dislike, user can't cancel the choice
      if (voteState.userLiked.like || voteState.userLiked.dislike) return;
      try {
        const response = await userService.toggleArticleLike(
          location.pathname,
          {
            like,
            dislike,
          }
        );
        if (like) {
          voteDispatch({ type: INCREASE_LIKE });
        } else if (dislike) {
          voteDispatch({ type: INCREASE_DISLIKE });
        }
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
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchArticle();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchArticle]);
  return (
    <ForumContent article={articleState} vote={voteState} onLike={onLike} />
  );
}

export default ForumContentContainer;
