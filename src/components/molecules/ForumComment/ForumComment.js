import React from "react";
import classNames from "classnames";
import styles from "./ForumComment.scss";
import Box from "../../atoms/Box/Box";
import FlexBox from "../../atoms/FlexBox";
import Sep from "../../atoms/Sep";
import { formattedDateString } from "../../../functions";
import SpanLink from "../../atoms/SpanLink";

const cx = classNames.bind(styles);

function ForumComment({ comment, re, children, ...rest }) {
  return (
    <Box className={cx("forum-comment", { re })} {...rest}>
      <FlexBox justifyContentSpaceBetween className={cx("comment-info")}>
        <FlexBox>
          <SpanLink>{comment.author.username}</SpanLink>
        </FlexBox>
        <FlexBox>
          <SpanLink>{formattedDateString(comment.dt_created)}</SpanLink>
          <Sep />
          <SpanLink>수정</SpanLink>
          <Sep />
          <SpanLink>삭제</SpanLink>
        </FlexBox>
      </FlexBox>
      <Box className={cx("comment-message")}>{children}</Box>
    </Box>
  );
}

export default ForumComment;
