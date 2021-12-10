import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import CommentTextarea from "../Comment/comment_textarea.component";

function CommentWrapper({
  comment,
  onDelete,
  onUpdate,
  user,
  isLoggedIn,
  onSubmit,
  replyFormKey,
  setReplyFormKey,
  updateFormKey,
  setUpdateFormKey,
}) {
  // subComment state can be used not only on subcomment, but also on update comment
  const [subComment, setSubComment] = useState({
    parent: null,
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
        setUpdateFormKey(null);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      }
    },
    [onSubmit, setReplyFormKey, setUpdateFormKey]
  );

  const onSubUpdate = useCallback(
    async (commentId, comment) => {
      try {
        await onUpdate(commentId, comment);
        setSubComment((c) => {
          return {
            ...c,
            content: "",
          };
        });
        setReplyFormKey(null);
        setUpdateFormKey(null);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.error(error);
        }
      }
    },
    [onUpdate, setReplyFormKey, setUpdateFormKey]
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
                  <span
                    className="article_info_modify info_col"
                    onClick={(e) => {
                      setSubComment((c) => {
                        return {
                          ...c,
                          parent: comment.parent ? comment.parent : null,
                          content: comment.content,
                        };
                      });
                      setUpdateFormKey((c) =>
                        c !== comment.id ? comment.id : null
                      );
                      setReplyFormKey(() => null);
                    }}
                  >
                    수정
                  </span>
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
                          parent: comment.parent ? comment.parent : comment.id,
                          content: "",
                        };
                      });
                      setReplyFormKey((c) =>
                        c !== comment.id ? comment.id : null
                      );
                      setUpdateFormKey(() => null);
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
      {updateFormKey === comment.id && (
        <div className="reply_form_wrapper re">
          <form
            className="reply_form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubUpdate(comment.id, subComment);
            }}
          >
            <div className="comment_item">
              <div className="comment_content">
                <div className="info_row">
                  <span>댓글 수정</span>
                </div>
                <div className="message reply">
                  <CommentTextarea
                    onChange={(e) => {
                      onChange(e, comment.parent ? comment.parent : null);
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
