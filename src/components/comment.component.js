// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";

function ChildComments(props) {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [counts, setCounts] = useState(null);

  // If updating data using useEffect, have to set trigger and request data in the useEffect Hook
  useEffect(() => {
    const queryString = { parent: props.parent, page: nextPage };
    UserService.getCommentList(location.pathname, queryString).then(
      (response) => {
        console.log(response.data);
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
      }
    );
  }, [location, props.parent, nextPage]);
  return (
    <div>
      {loading && <div>로딩중</div>}
      {loaded &&
        comments.map((comment, idx) => {
          return (
            <ul key={idx}>
              <li>작성자: {comment.author}</li>
              <li>작성시간: {comment.dt_created}</li>
              <li>수정시간: {comment.dt_modified}</li>
              <li>내용: {comment.content}</li>
            </ul>
          );
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

function CommentComponent(props) {
  const [commentState, setCommentState] = useState(
    new Array(props.comments.length).fill(false)
  );
  return !props.nullPage ? (
    <div>
      {props.comments.map((comment, idx) => {
        return (
          <ul key={idx}>
            <li>작성자: {comment.author}</li>
            <li>작성시간: {comment.dt_created}</li>
            <li>수정시간: {comment.dt_modified}</li>
            <li>내용: {comment.content}</li>
            <li>
              <button
                onClick={() => {
                  const currentCommentState = [...commentState];
                  currentCommentState[idx] = !commentState[idx];
                  setCommentState(currentCommentState);
                }}
              >
                {comment.children_count}개의 답글
              </button>
            </li>
            {commentState[idx] && (
              <li>
                <ChildComments parent={comment.id} />
              </li>
            )}
          </ul>
        );
      })}
    </div>
  ) : (
    <ul>아직 댓글이 없습니다. 댓글을 써보세요!</ul>
  );
}

export default CommentComponent;
