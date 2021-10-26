// react imports
import React, { useState } from "react";

// custom imports
import CommentForm from "./form.component";
import CommentTemplate from "../../templates/comment.template";
import UserService from "../../services/user.service";

// functions
import { checkIfContentIsModified } from "../../functions";

// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function CommentRow(props) {
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

  // TODO: Do not refresh after modify content
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
    <li className="comment_row">
      <div className="comment">
        {/** comment info */}
        <div className="comment__header">
          <div className="comment__header__left">
            <span className="comment__header__username">
              {props.comment.author.username}
            </span>
          </div>
          <div className="comment__header__right">
            <span className="comment__header__dt_created">
              {new Date(props.comment.dt_created).toLocaleString()}
            </span>
          </div>
        </div>
        {/** comment content || comment modification form */}
        {!modificationMode ? (
          <div className="comment__content">
            {checkIfContentIsModified(
              props.comment.dt_created,
              props.comment.dt_modified
            ) && <span className="modified">**수정됨</span>}
            <span className="content">{props.comment.content}</span>
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
                required
              />
              <input type="submit" value="수정하기" />
            </form>
          </div>
        )}
        {/** comment footer */}
        <div className="comment__footer">
          {props.isLoggedIn && (
            <ul className="comment__management_menu">
              {props.isLoggedIn && !props.comment.parent && (
                <li onClick={toggleReplyForm}>답글</li>
              )}
              {(props.user.user.username === props.comment.author.username ||
                props.user.user.is_staff) && (
                // TODO: change component to ul - li and apply display: flex
                <>
                  <li onClick={handleModificationMode}>수정</li>
                  <li
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
                    삭제
                  </li>
                </>
              )}
            </ul>
          )}
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
        </div>
      </div>
      {replyForm && <CommentForm parent={props.comment.id} />}
      {subcommentBtn && (
        <div className="comment__re">
          <CommentTemplate parent={props.comment.id} />
        </div>
      )}
    </li>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentRow);
