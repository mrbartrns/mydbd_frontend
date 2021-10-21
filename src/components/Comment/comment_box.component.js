// react imports
import React from "react";

// custom imports
import CommentTemplate from "../../templates/comment.template";
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
              state={props.commentState[idx]}
              handleDeleteComment={props.handleDeleteComment}
              idx={idx}
              onClickFunction={() => {
                props.toggleCommentBtn(idx);
              }}
            />
            {props.commentState[idx] && !comment.parent && (
              <CommentTemplate parent={comment.id} />
            )}
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
