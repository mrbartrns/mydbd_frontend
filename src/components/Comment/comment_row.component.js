// react imports
import React, { useState } from "react";

// custom imports
import CommentTemplate from "../../templates/comment.template";
import CommentFooter from "./comment_footer.component";
import UserService from "../../services/user.service";
import {
  CommentHeader,
  CommentContent,
  CommentModifyForm,
} from "./comment.component";

// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function CommentRow(props) {
  // When click 답글쓰기 -> have to open form

  // states
  const [modificationMode, setModificationMode] = useState(false);
  const [subcommentBtn, setSubcommentBtn] = useState(false);
  const [replyForm, setReplyForm] = useState(true);
  const [modificatedContent, setModificatedContent] = useState("");

  // functions
  function handleModificationMode(e) {
    e.preventDefault();
    setModificationMode(!modificationMode);
  }

  function toggleReplyForm(e) {
    e.preventDefault();
    setReplyForm(!replyForm);
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
        <CommentHeader comment={props.comment} />
        {/** comment content || comment modification form */}
        {!modificationMode ? (
          <CommentContent comment={props.comment} />
        ) : (
          <CommentModifyForm
            submitModificatedContent={submitModificatedContent}
            comment={props.comment}
            modificatedContent={modificatedContent}
            handleUpdateContentChange={handleUpdateContentChange}
          />
        )}
        {/** comment footer */}
        <CommentFooter
          comment={props.comment}
          replyForm={replyForm}
          toggleReplyForm={toggleReplyForm}
          handleModificationMode={handleModificationMode}
          deleteComment={deleteComment}
          toggleSubcommentBtn={toggleSubcommentBtn}
        />
      </div>
      {/* {replyForm && <CommentForm parent={props.comment.id} />} */}
      {subcommentBtn && (
        <div className="comment__re">
          <CommentTemplate parent={props.comment.id} replyForm={replyForm} />
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
