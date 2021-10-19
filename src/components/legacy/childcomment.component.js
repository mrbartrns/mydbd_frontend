// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import UserService from "../../services/user.service";

function Comment(props) {
  return <div></div>;
}

function ChildComments(props) {
  // react hooks
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [counts, setCounts] = useState(null);

  // If updating data using useEffect, have to set trigger and request data in the useEffect Hook
  // Must have to unsubscribe after fetch data or axios.cancel
  // else use mount variables and return false after mounted
  useEffect(() => {
    const source = UserService.getCancelToken();

    const queryString = {
      parent: props.parent,
      page: nextPage,
      cancelToken: source.token,
    };
    // let mounted = true;
    UserService.getCommentList(location.pathname, queryString)
      .then((response) => {
        setLoaded(false);
        setLoading(true);
        // 다음 comments를 불러올 때 comments 자체를 안에서 밖에 쓰지 않는다면 함수형으로 작성한다.
        setComments((c) => {
          return [...c, ...response.data.results];
        });
        setCounts(response.data.count);
        setNextPageUrl(response.data.next);
        setLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        if (!UserService.isCancel(error)) {
          console.error(error);
        }
      });
    return () => {
      // mounted = false;
      // source.cancel();
      UserService.unsubscribe();
    };
  }, [location, props.parent, nextPage]);
  return (
    <div>
      {loading && <div>로딩중</div>}
      {loaded &&
        comments.map((comment, idx) => {
          return <Comment key={idx} comment={comment} onClickFunction={null} />;
        })}
      {loaded && counts > 10 && (
        <button
          onClick={() => {
            if (!nextPageUrl) return;
            setNextPage(nextPage + 1);
          }}
        >
          댓글 더보기
        </button>
      )}
    </div>
  );
}

export default ChildComments;
