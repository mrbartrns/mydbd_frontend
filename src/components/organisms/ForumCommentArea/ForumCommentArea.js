import React from "react";
import classNames from "classnames";
import styles from "./ForumCommentArea.scss";
import Box from "../../atoms/Box/Box";
import Paginator from "../../molecules/Paginator";
import FlexBox from "../../atoms/FlexBox";
import CommentTextarea from "../../molecules/CommentTextArea";
import { Form } from "react-bootstrap";
import ForumSubCommentContainer from "../../../containers/ForumSubCommentContainer/ForumSubCommentContainer";

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
            <ForumSubCommentContainer
              key={comment.id}
              comment={comment}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onSubmit={onSubmit}
              replyFormKey={replyFormKey}
              setReplyFormKey={setReplyFormKey}
              updateFormKey={updateFormKey}
              setUpdateFormKey={setUpdateFormKey}
            />
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
      <Form
        onSubmit={
          onSubmit
            ? (e) => {
                e.preventDefault();
                onSubmit(commentState.inputs);
              }
            : null
        }
      >
        <h2>댓글 쓰기</h2>
        <CommentTextarea
          required
          onChange={onChange ? (e) => onChange(e, null) : null}
        />
      </Form>
    </div>
  );
}

export default ForumCommentArea;
