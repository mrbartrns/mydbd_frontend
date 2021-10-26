import React from "react";

import { checkIfContentIsModified } from "../../functions";

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
    <div className="comment__modify">
      <form
        onSubmit={() => {
          props.submitModificatedContent(props.comment.id, {
            content: props.modificatedContent,
          });
        }}
      >
        <textarea
          defaultValue={props.comment.content}
          onChange={props.handleUpdateContentChange}
          required
        />
        <input type="submit" value="수정하기" />
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
      <span className="content">{props.comment.content}</span>
    </div>
  );
}
