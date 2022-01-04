import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import setAutoHeight from "../../common/set-auto-height";
import CommentForm from "../../components/molecules/CommentForm";
import ForumComment from "../../components/molecules/ForumComment/ForumComment";

function ForumSubCommentContainer({
  comment,
  onDelete,
  onUpdate,
  user,
  isLoggedIn,
  dispatch,
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
  // comment reply
  const onSubChange = useCallback((e, parent) => {
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
  // delete comment
  const onSubDelete = useCallback(
    async (commentId) => {
      const DELETE_MESSAGE = "이 동작은 취소할 수 없습니다. 삭제하시겠습니까?";
      try {
        if (window.confirm(DELETE_MESSAGE)) {
          await onDelete(commentId);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
        console.error(error);
      }
    },
    [onDelete]
  );
  // update comment
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
    <>
      <ForumComment
        comment={comment}
        re={comment.parent ? true : false}
        byAuthor={comment.parent && user && user.user?.id === comment.author.id}
        onDelete={onSubDelete}
        replyFormKey={replyFormKey}
        setReplyFormKey={setReplyFormKey}
        updateFormKey={updateFormKey}
        setUpdateFormKey={setUpdateFormKey}
        setSubComment={setSubComment}
        isLoggedIn={isLoggedIn}
        user={user && user.user ? user.user : null}
        deleted={comment?.is_deleted || false}
      >
        {comment.content}
      </ForumComment>
      {(replyFormKey === comment.id || updateFormKey === comment.id) && (
        <CommentForm
          className="re"
          comment={comment}
          onSubmit={() => {
            if (replyFormKey === comment.id) {
              return onSubSubmit(subComment);
            } else if (updateFormKey === comment.id) {
              return onSubUpdate(comment.id, subComment);
            }
          }}
          onChange={(e) => {
            setAutoHeight(e);
            if (replyFormKey === comment.id) {
              return onSubChange(
                e,
                comment.parent ? comment.parent : comment.id
              );
            } else if (updateFormKey === comment.id) {
              onSubChange(e, comment.parent ? comment.parent : null);
            }
          }}
          value={subComment.content}
        >
          <span className="title">
            {replyFormKey === comment.id
              ? "답글 쓰기"
              : updateFormKey === comment.id
              ? "댓글 수정"
              : null}
          </span>
        </CommentForm>
      )}
    </>
  );
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.authReducer;
  return { user, isLoggedIn };
}

export default connect(mapStateToProps)(ForumSubCommentContainer);
