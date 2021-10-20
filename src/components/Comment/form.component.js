import React from "react";
import { connect } from "react-redux";

// css
import "../../css/component/comment.component.scss";

function CommentForm(props) {
  return props.isLoggedIn ? (
    <form
      className="comment__form"
      onSubmit={(e) => {
        if (!props.isLoggedIn) {
          e.preventDefault();
        }
        props.submitComment({
          parent: props.parent,
          content: props.content,
        });
      }}
    >
      <div className="comment__form__input_area">
        {props.isLoggedIn && <label>{props.user.user.username}</label>}
        <textarea
          required
          className={`comment__input ${props.isLoggedIn && "logined"}`}
          placeholder="댓글을 적으세요."
          onChange={props.handleContentChange}
        />
      </div>
      <div className="comment__form__submit_area">
        <input
          className="comment__submit_btn"
          type="submit"
          value="댓글 적기"
        />
      </div>
    </form>
  ) : null;
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentForm);
