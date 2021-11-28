import React from "react";

function ArticleComment(props) {
  return (
    <div className="list_area">
      {props.article.comments.map((comment) => {
        return (
          // Wrapper contains comment id and it will be used to link
          <div className="comment_wrapper" key={comment.id}>
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
      })}
    </div>
  );
}
