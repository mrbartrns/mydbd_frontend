import React from "react";

import "../../css/component/comment.component.scss";

function Comment(props) {
  return (
    <div className="comment">
      <div className="comment__info">
        <span className="comment__info__username">
          {props.comment.author.username}
        </span>
        <span className="comment__info__dt_created">
          {new Date(props.comment.dt_created).toLocaleString()}
        </span>
      </div>
      <div className="comment__content">
        {new Date(props.comment.dt_created).valueOf() + 1000 <
          new Date(props.comment.dt_modified).valueOf() && (
          <span className="modified">**수정됨</span>
        )}
        <span className="content">{props.comment.content}</span>
      </div>
      {!props.comment.parent && (
        <button
          className="comment__child_toggle_btn"
          onClick={props.onClickFunction}
        >
          답글{" "}
          <span className="comment__child_count">
            {props.comment.children_count}
          </span>
        </button>
      )}
    </div>
  );
}

export default Comment;
