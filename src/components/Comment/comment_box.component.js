// react imports
import React from "react";

// custom imports
import Comment from "./comment_row.component";

// css
import "../../css/component/comment.component.scss";

function CommentBox(props) {
  return !props.nullPage && props.comments.length > 0 ? (
    <ul className={`comment__box ${!props.parent && "first"}`}>
      {props.comments.map((comment, idx) => {
        return (
          <li className="comment__box__comment" key={idx}>
            <Comment
              comment={comment}
              // 데이터 조작과 관련된 함수들은 모두 comment.template로부터 받아온다.
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
