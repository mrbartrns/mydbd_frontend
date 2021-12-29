import React from "react";
import classNames from "classnames";
import styles from "./ForumComment.scss";
import Box from "../../atoms/Box/Box";
import FlexBox from "../../atoms/FlexBox";
import Sep from "../../atoms/Sep";
import { formattedDateString } from "../../../functions";
import SpanLink from "../../atoms/SpanLink";

const cx = classNames.bind(styles);

function ForumComment({
  comment,
  re,
  byAuthor,
  replyFormKey,
  setReplyFormKey,
  updateFormKey,
  setUpdateFormKey,
  subComment,
  setSubComment,
  children,
  isLoggedIn,
  onDelete,
  user,
  ...rest
}) {
  return (
    <Box
      className={cx("forum-comment", { re, "by-author": byAuthor })}
      {...rest}
    >
      <FlexBox
        justifyContentSpaceBetween
        className={cx("comment-info", { "by-author": byAuthor })}
      >
        <FlexBox>
          <SpanLink>{comment.author.username}</SpanLink>
        </FlexBox>
        <FlexBox>
          <SpanLink>{formattedDateString(comment.dt_created)}</SpanLink>

          {isLoggedIn && (user.id === comment.author.id || user.is_staff) && (
            <>
              <Sep />
              <SpanLink
                onClick={() => {
                  setSubComment((prev) => {
                    return {
                      ...prev,
                      parent: comment.parent ? comment.parent : null,
                      content: comment.content,
                    };
                  });
                  setUpdateFormKey((prev) =>
                    prev !== comment.id ? comment.id : null
                  );
                  setReplyFormKey(() => null);
                }}
              >
                수정
              </SpanLink>
              <Sep />
              <SpanLink onClick={onDelete}>삭제</SpanLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <Sep />
              <SpanLink
                onClick={() => {
                  setSubComment((prev) => {
                    return {
                      ...prev,
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
              </SpanLink>
            </>
          )}
        </FlexBox>
      </FlexBox>
      <Box className={cx("comment-message")}>{children}</Box>
    </Box>
  );
}

export default ForumComment;
