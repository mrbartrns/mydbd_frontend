import React from "react";
import classNames from "classnames";
import styles from "./ForumCommentArea.scss";
import Box from "../../atoms/Box/Box";
import ForumComment from "../../molecules/ForumComment/ForumComment";
import Paginator from "../../molecules/Paginator";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(styles);

function ForumCommentArea({
  user,
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
        [{commentState.count}]개의 댓글
      </Box>
      {commentState.fetchSuccess &&
        commentState.comments.map((comment) => {
          return (
            <ForumComment
              key={comment.id}
              comment={comment}
              re={comment.parent ? true : false}
              byAuthor={comment.parent && user?.id === comment.author.id}
            >
              {comment.content}
            </ForumComment>
          );
        })}
      <FlexBox className={cx("comment-paginator-box")}>
        {commentState.fetchSuccess && paginationState.count > 1 && (
          <Paginator
            currentPage={paginationState.currentPage}
            offset={paginationState.offset}
            startIndex={paginationState.startIndex}
            endIndex={paginationState.endIndex}
            count={paginationState.count}
            pageSize={paginationState.pageSize}
            onNext={onNext}
            onPrev={onPrev}
            goTo={goTo}
          />
        )}
      </FlexBox>
    </div>
  );
}

export default ForumCommentArea;
