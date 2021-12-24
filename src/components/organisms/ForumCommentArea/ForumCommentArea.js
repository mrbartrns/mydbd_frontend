import React from "react";
import classNames from "classnames";
import styles from "./ForumCommentArea.scss";
import Box from "../../atoms/Box/Box";
import ForumComment from "../../molecules/ForumComment/ForumComment";

const cx = classNames.bind(styles);

function ForumCommentArea({
  commentState,
  paginationState,
  onNext,
  onPrev,
  goTo,
  onChange,
  onSubmit,
  onDelete,
  onUpdate,
  replyFormKey,
  setReplyFormKey,
  updateFormKey,
  setUpdateFormKey,
}) {
  return (
    <div className={cx("forum-comment-area")}>
      <Box fullWidth className={cx("comment-title")}>
        {commentState.count}개의 댓글
      </Box>
      {commentState.fetchSuccess &&
        commentState.comments.map((comment) => {
          return (
            <ForumComment comment={comment} re={comment.parent ? true : false}>
              {comment.content}
            </ForumComment>
          );
        })}
    </div>
  );
}

export default ForumCommentArea;
