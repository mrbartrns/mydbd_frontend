import React from "react";

// TODO: 내용 채우기
function CommentWrapper({ comment, onSubmit, onDelete, onUpdate }) {
  return (
    <div className="comment_wrapper">
      {/** Comment list remove element */}
      <div className="comment_item">
        <div className="comment_content">
          <div className="info_row">
            <div className="member_info">
              <span className="user_info">{comment.author.username}</span>
            </div>
            <div className="article_info">
              <span className="article_info_datetime">
                {new Date(comment.dt_created).toLocaleString()}
              </span>
              <span className="sep" />
              <span className="article_info_delete">삭제</span>
              <span className="sep" />
              <span className="article_info_modify">수정</span>
              <span className="sep" />
              <span className="article_info_reply">답글</span>
            </div>
          </div>
          <div className="message">
            <div className="comment_text">
              <span>{comment.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentWrapper;
