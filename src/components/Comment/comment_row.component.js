// react imports
import React, { useState } from "react";

// custom imports
import CommentForm from "./form.component";

// functions
import { checkIfContentIsModified } from "../../functions";

// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function Comment(props) {
  // When click 답글쓰기 -> have to open form

  // states
  const [modificationMode, setModificationMode] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  // functions
  function handleModificationMode(e) {
    e.preventDefault();
    setModificationMode(!modificationMode);
  }

  function handleSubCommentForm(e) {
    e.preventDefault();
    setOpenReply(!openReply);
  }

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
      {!modificationMode ? (
        <div className="comment__content">
          {checkIfContentIsModified(
            props.comment.dt_created,
            props.comment.dt_modified
          ) && <span className="modified">**수정됨</span>}
          <span className="content">{props.comment.content}</span>
        </div>
      ) : (
        <textarea defaultValue={props.comment.content} />
      )}
      <div className="comment__footer">
        {!props.comment.parent && (
          <button
            className="comment__child_toggle_btn"
            onClick={props.onClickFunction}
          >
            답글
            <span className="comment__child_count">
              {props.comment.children_count}
            </span>
          </button>
        )}
        {(props.user.user.username === props.comment.author.username ||
          props.user.user.is_staff) && (
          // TODO: change component to ul - li and apply display: flex
          <div style={{ display: "inline-block" }}>
            <span onClick={handleModificationMode}>수정하기</span>
            <span>삭제하기</span>
          </div>
        )}
        {!props.comment.parent && (
          <span onClick={handleSubCommentForm}>답글쓰기</span>
        )}
      </div>
      {openReply && <CommentForm parent={props.comment.id} />}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Comment);
