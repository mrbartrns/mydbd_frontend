import React from "react";

import { checkIfContentIsModified } from "../../functions";
import CommentTextarea from "./comment_textarea.component";

export function CommentHeader(props) {
  return (
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
  );
}

export function CommentModifyForm(props) {
  return (
    <div className="comment__content">
      <form
        className="modify_form"
        onSubmit={() => {
          props.submitModificatedContent(props.comment.id, {
            content: props.modificatedContent,
          });
        }}
      >
        <CommentTextarea
          className={"modify_form__textarea"}
          onChange={props.handleUpdateContentChange}
          placeholder={"수정할 내용을 입력하세요."}
          required={true}
          spellCheck={false}
          defaultValue={props.comment.content}
        />
        <input
          type="submit"
          value="수정하기"
          className="modify_form__submit_btn"
        />
      </form>
    </div>
  );
}

export function CommentContent(props) {
  return (
    <div className="comment__content">
      {checkIfContentIsModified(
        props.comment.dt_created,
        props.comment.dt_modified
      ) && <span className="modified">**수정됨</span>}
      <span className="comment__content content_field">
        {props.comment.content}
      </span>
    </div>
  );
}
