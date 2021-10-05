// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";

// custom imports
import userService from "../services/user.service";

function CommentComponent(props) {
  const location = useLocation();
  const [childComments, setChildComments] = useState([]);
  function getChildComments() {
    userService.getCommentList();
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
            <li>{comment.children_count}개의 답글</li>
          </ul>
        );
      })}
    </div>
  ) : (
    <ul>페이지가 존재하지 않습니다.</ul>
  );
}

export default CommentComponent;
