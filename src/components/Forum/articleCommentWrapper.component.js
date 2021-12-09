import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import CommentTextarea from "../Comment/comment_textarea.component";
import { useLocation } from "react-router-dom";

// TODO: 내용 채우기
function CommentWrapper({
  comment,
  onDelete,
  onUpdate,
  user,
  isLoggedIn,
  onSubmit,
  commentState,
  replyFormKey,
  setReplyFormKey,
}) {
  const location = useLocation();
  const [subComment, setSubComment] = useState({
    parent: comment.id,
    content: "",
  });

  const onChange = useCallback((e, parent) => {
    setSubComment((c) => {
      return {
        ...c,
        parent: parent,
        content: e.target.value,
      };
    });
  }, []);

  // 버그 수정: 두번째 시도부터 작동 안함
  const onSubSubmit = useCallback(
    async (comment) => {
      try {
        await onSubmit(comment);
        setSubComment((c) => {
          return {
            ...c,
            content: "",
          };
        });
        setReplyFormKey(null);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      }
    },
    [onSubmit, setReplyFormKey]
  );

  return (
    <div className={`comment_wrapper${comment.parent ? " re" : ""}`}>
      {/** Comment list remove element */}
      <div className="comment_item">
        <div className="comment_content">
          <div className="info_row">
            <div className="member_info">
              <span className="user_info">{comment.author.username}</span>
            </div>
            <div className="article_info">
              <span className="article_info_datetime info_col">
                {new Date(comment.dt_created).toLocaleString()}
              </span>
              {user.user.id === comment.author.id && (
                <>
                  <span className="sep" />
                  <span className="article_info_delete info_col">삭제</span>
                  <span className="sep" />
                  <span className="article_info_modify info_col">수정</span>
                </>
              )}
              {isLoggedIn && (
                <>
                  <span className="sep" />
                  <span
                    className="article_info_reply info_col"
                    onClick={() => {
                      setSubComment((c) => {
                        return {
                          ...c,
                          content: "",
                        };
                      });
                      setReplyFormKey((c) =>
                        c !== comment.id ? comment.id : null
                      );
                    }}
                  >
                    답글
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="message">
            <div className="comment_text">
              <span>{comment.content}</span>
            </div>
          </div>
        </div>
      </div>
      {replyFormKey === comment.id && (
        <div className="reply_form_wrapper re">
          <form
            className="reply_form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubSubmit(subComment);
            }}
          >
            <div className="comment_item">
              <div className="comment_content">
                <div className="info_row">
                  <span>답글 작성</span>
                </div>
                <div className="message reply">
                  <CommentTextarea
                    onChange={(e) => {
                      onChange(e, comment.parent ? comment.parent : comment.id);
                    }}
                    value={subComment.content}
                  />
                  <input type="submit" value="답글 쓰기" />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.authReducer;
  return { user, isLoggedIn };
}

export default connect(mapStateToProps)(CommentWrapper);
