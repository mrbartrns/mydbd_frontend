import React, { useState } from "react";

import { checkIfContentIsModified } from "../../functions";
// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function Comment(props) {
  // When click 답글쓰기 -> have to open form
  const [modificationMode, setModificationMode] = useState(false);

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
        {checkIfContentIsModified(
          props.comment.dt_created,
          props.comment.dt_modified
        ) && <span className="modified">**수정됨</span>}
        <span className="content">{props.comment.content}</span>
      </div>
      <div className="comment__footer">
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
        {(props.user.user.username === props.comment.author.username ||
          props.user.user.is_staff) && (
          <div style={{ display: "inline-block" }}>
            <span>수정하기</span>
            <span>삭제하기</span>
          </div>
        )}
        <span>답글쓰기</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Comment);
