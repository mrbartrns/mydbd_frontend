// react imports
import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";

// custom imports
import UserService from "../../services/user.service";

// css
import "../../css/component/comment.component.scss";

function CommentForm(props) {
  // constants
  const location = useLocation();

  // states
  const [content, setContent] = useState("");

  // functions
  function handlePostComment(data) {
    if (!props.isLoggedIn) {
      console.log("로그인 해야 작성할 수 있습니다.");
      return;
    }
    if (data.content === "") {
      alert("적어도 한 글자 이상 작성해야 합니다.");
      return;
    }
    UserService.postComment(location.pathname, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // TODO: set error message (error.response.data)
        console.log(error);
      });
  }

  function handleContentChange(e) {
    e.preventDefault();
    setContent(e.target.value);
  }

  return props.isLoggedIn ? (
    <form
      className="comment__form"
      onSubmit={(e) => {
        if (!props.isLoggedIn) {
          e.preventDefault();
        }
        handlePostComment({
          parent: props.parent,
          content: content,
        });
      }}
    >
      <div className="comment__form__input_area">
        {props.isLoggedIn && <label>{props.user.user.username}</label>}
        <textarea
          required
          className={`comment__input ${props.isLoggedIn && "logined"}`}
          placeholder="댓글을 적으세요."
          onChange={handleContentChange}
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
