import React from "react";

// TODO: 내용 채우기
function CommentWrapper(props) {
  return (
    <div className={`comment_item`}>
      {/* margin -> new component 사용 */}
      <div className="comment">
        <div className="info_row"></div>
        <div className="message"></div>
      </div>
      {/* will be displayed only parent == null conditon */}
      <form className="reply_form"></form>
    </div>
  );
}

export default CommentWrapper;
