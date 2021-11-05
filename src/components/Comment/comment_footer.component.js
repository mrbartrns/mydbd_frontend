import React from "react";
import { connect } from "react-redux";

const DELETE_COMMENT_CONFIRM_MESSAGE =
  "정말 삭제합니까? 이 동작은 취소할 수 없습니다.";

function CommentFooter(props) {
  function confirmDeleteComment(e) {
    if (!window.confirm(DELETE_COMMENT_CONFIRM_MESSAGE)) return;
    props.deleteComment(props.comment.id);
  }
  return (
    <div className="comment__footer">
      {props.isLoggedIn && (
        <ul className="comment__management_menu">
          {(props.user.user.username === props.comment.author.username ||
            props.user.user.is_staff) && (
            // TODO: change component to ul - li and apply display: flex
            <>
              <li onClick={props.handleModificationMode}>수정</li>
              <li onClick={confirmDeleteComment}>삭제</li>
            </>
          )}
        </ul>
      )}
      <ul>
        <li onClick={props.toggleLike}>
          <span>좋아요</span>
          <span>{props.commentLikeCount}</span>
        </li>
        <li onClick={props.toggleDislike}>
          <span>싫어요</span>
          <span>{props.commentDislikeCount}</span>
        </li>
      </ul>
      {!props.comment.parent && (
        <button
          className="comment__child_toggle_btn"
          onClick={props.toggleSubcommentBtn}
        >
          답글
          <span className="comment__child_count">
            {props.comment.children_count}
          </span>
        </button>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentFooter);
