import React from "react";
import { connect } from "react-redux";

function CommentFooter(props) {
  return (
    <div className="comment__footer">
      {props.isLoggedIn && (
        <ul className="comment__management_menu">
          {props.isLoggedIn && !props.comment.parent && (
            <li onClick={props.toggleReplyForm}>답글</li>
          )}
          {(props.user.user.username === props.comment.author.username ||
            props.user.user.is_staff) && (
            // TODO: change component to ul - li and apply display: flex
            <>
              <li onClick={props.handleModificationMode}>수정</li>
              <li
                onClick={() => {
                  if (
                    !window.confirm(
                      "정말 삭제합니까? 이 동작은 취소할 수 없습니다."
                    )
                  )
                    return;
                  props.deleteComment(props.comment.id);
                }}
              >
                삭제
              </li>
            </>
          )}
        </ul>
      )}
      <ul>
        <li
          onClick={(e) => {
            props.toggleLike();
          }}
        >
          <span>좋아요</span>
          <span>{props.commentLikeCount}</span>
        </li>
        <li>
          <span>싫어요</span>
          <span>{props.comment.dislike_count}</span>
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
