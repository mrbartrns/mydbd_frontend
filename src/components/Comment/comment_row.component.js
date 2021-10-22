// react imports
import React, { useState } from "react";

// custom imports
import CommentForm from "./form.component";
import CommentTemplate from "../../templates/comment.template";
import UserService from "../../services/user.service";

// functions
import { checkIfContentIsModified } from "../../functions";
import { replaceNewLineToBr } from "../../functions";

// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function Comment(props) {
  // When click 답글쓰기 -> have to open form

  // states
  const [modificationMode, setModificationMode] = useState(false);
  const [subcommentBtn, setSubcommentBtn] = useState(false);
  const [replyForm, toggleReplyFrom] = useState(false);
  const [modificatedContent, setModificatedContent] = useState("");

  // functions
  function handleModificationMode(e) {
    e.preventDefault();
    setModificationMode(!modificationMode);
  }

  function toggleReplyForm(e) {
    e.preventDefault();
    toggleReplyFrom(!replyForm);
  }

  function handleUpdateContentChange(e) {
    e.preventDefault();
    setModificatedContent(e.target.value);
  }

  function toggleSubcommentBtn(e) {
    e.preventDefault();
    setSubcommentBtn(!subcommentBtn);
  }

  function submitModificatedContent(commentId, data) {
    UserService.updateComment(commentId, data)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  // TODO: 데이터 조작과 관련된 함수를 comment template로 옮기기
  function deleteComment(commentId) {
    UserService.deleteComment(commentId)
      .then((response) => {
        props.handleDeleteComment(commentId);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <span className="content">
            {replaceNewLineToBr(props.comment.content)}
          </span>
        </div>
      ) : (
        <div className="comment__modify">
          <form
            onSubmit={() => {
              submitModificatedContent(props.comment.id, {
                content: modificatedContent,
              });
            }}
          >
            <textarea
              defaultValue={props.comment.content}
              onChange={handleUpdateContentChange}
            />
            <input type="submit" value="수정하기" />
          </form>
        </div>
      )}
      <div className="comment__footer">
        {!props.comment.parent && (
          <button
            className="comment__child_toggle_btn"
            onClick={toggleSubcommentBtn}
          >
            답글
            <span className="comment__child_count">
              {props.comment.children_count}
            </span>
          </button>
        )}
        {props.isLoggedIn &&
          (props.user.user.username === props.comment.author.username ||
            props.user.user.is_staff) && (
            // TODO: change component to ul - li and apply display: flex
            <div style={{ display: "inline-block" }}>
              <span onClick={handleModificationMode}>수정하기</span>
              <span
                onClick={() => {
                  if (
                    !window.confirm(
                      "정말 삭제합니까? 이 동작은 취소할 수 없습니다."
                    )
                  )
                    return;
                  deleteComment(props.comment.id);
                }}
              >
                삭제하기
              </span>
            </div>
          )}
        {props.isLoggedIn && !props.comment.parent && (
          <span onClick={toggleReplyForm}>답글쓰기</span>
        )}
      </div>
      {replyForm && <CommentForm parent={props.comment.id} />}
      {subcommentBtn && (
        <div className="comment__re">
          <CommentTemplate parent={props.comment.id} />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Comment);
