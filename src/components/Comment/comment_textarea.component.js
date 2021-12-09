import React from "react";

import "../../css/component/comment.component.scss";

function CommentTextarea(props) {
  return (
    <textarea
      className={`comment_textarea ${props.className ? props.className : ""}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required={props.required}
      spellCheck={props.spellCheck}
      value={props.value}
    />
  );
}

export default CommentTextarea;
