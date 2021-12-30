import React, { useEffect, useReducer, useCallback } from "react";
import { useLocation } from "react-router-dom";
import userService from "../../services/user.service";
import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAIL,
  REFRESH,
  LOADING,
  LOADED,
  ERROR,
  initialState,
  reducer,
} from "../../abstract_structures/game-detail";
import {
  FETCH_LIKES,
  INCREASE_LIKE,
  INCREASE_DISLIKE,
  SET_USER_LIKED,
  VOTE_ERROR,
  initialState as initialVoteState,
  reducer as voteReducer,
} from "../../abstract_structures/vote";
import ObjectProfile from "../../components/organisms/ObjectProfile/ObjectProfile";

function GameDetailContainer({ category }) {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [voteState, voteDispatch] = useReducer(voteReducer, initialVoteState);

  const getFetchGameDetail = useCallback(async () => {
    dispatch({ type: FETCH_INIT });
    dispatch({ type: LOADING });
    try {
      const response = await userService.getApiDetail(location.pathname);
      dispatch({ type: REFRESH, payload: response.data });
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
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOADED });
    } catch (error) {
      dispatch({ type: FETCH_FAIL });
      if (error.response && error.response.data) {
        dispatch({ type: ERROR, payload: error.response.data });
      }
      dispatch({ type: LOADED });
    }
  }, [location.pathname]);

  const onLike = useCallback(
    async ({ like, dislike }) => {
      if (voteState.userLiked.like || voteState.userLiked.dislike) return;
      try {
        const response = await userService.toggleArticleLike(
          location.pathname,
          { like, dislike }
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
        console.error(error);
      }
    },
    [location.pathname, voteState]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchGameDetail();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchGameDetail]);
  return (
    <ObjectProfile profileState={state} voteState={voteState} onLike={onLike} />
  );
}

export default GameDetailContainer;
