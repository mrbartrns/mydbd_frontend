// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";

// TODO: Modify child comment structure
function ChildComments(props) {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // TODO: 일정 댓글 갯수 이상이 되면 댓글을 불러오는 함수 만들기
  useEffect(() => {
    const queryString = { parent: props.parent };
    UserService.getCommentList(location.pathname, queryString).then(
      (response) => {
        setLoaded(false);
        setLoading(true);
        setComments(response.data.results);
        setLoaded(true);
        setLoading(false);
      }
    );
  }, [location, props.parent]);
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
