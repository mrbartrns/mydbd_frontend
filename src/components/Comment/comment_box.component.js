// react imports
import React from "react";

// custom imports
import Comment from "./comment_row.component";

// css
import "../../css/component/comment.component.scss";

function CommentBox(props) {
  return !props.nullPage && props.comments.length > 0 ? (
    <ul className={`comment__box ${!props.parent && "first"}`}>
      {props.comments.map((comment) => {
        return (
          // key에대하여 index를 사용할 경우 새로고침 될 시 하나씩 뒤로 밀려나게 됨
          <li className="comment__box__comment" key={comment.id}>
            <Comment
              comment={comment}
              key={comment.id}
              handleDeleteComment={props.handleDeleteComment}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    props.loaded && (
      <ul>
        <li>아직 댓글이 없습니다. 댓글을 써보세요!</li>
      </ul>
    )
  );
}

export default CommentBox;
