// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";

// TODO: Try to make ChildCommentComponent

function CommentComponent(props) {
  const location = useLocation();
  // FIXME: when request child parents, response each child and display
  const [childComments, setChildComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  function getChildComments(parentId) {
    UserService.getCommentList(location.pathname, { parent: parentId })
      .then((response) => {
        console.log(response);
        setLoaded(false);
        setChildComments(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return !props.nullPage ? (
    <div>
      {props.comments.map((comment, idx) => {
        return (
          <ul key={idx}>
            <li>작성자: {comment.author}</li>
            <li>작성시간: {comment.dt_created}</li>
            <li>수정시간: {comment.dt_modified}</li>
            <li>내용: {comment.content}</li>
            {!comment.parent ? (
              <li>
                <button
                  onClick={() => {
                    // console.log(comment.id);
                    // TODO: set useState function in inner function -> not available
                    // useState function only can be used in react component
                    getChildComments(comment.id);
                  }}
                >
                  {comment.children_count}개의 답글
                </button>
              </li>
            ) : null}
            {loaded && (
              <li>
                <CommentComponent nullPage={false} comments={childComments} />
              </li>
            )}
          </ul>
        );
      })}
    </div>
  ) : (
    <ul>페이지가 존재하지 않습니다.</ul>
  );
}

export default CommentComponent;
