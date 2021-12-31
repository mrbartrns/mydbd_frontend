import React from "react";
import classNames from "classnames";
import styles from "./GameComment.scss";
import Box from "../../atoms/Box";
import CommentHeader from "../CommentHeader/CommentHeader";
import SpanLink from "../../atoms/SpanLink";
import { formattedDateString } from "../../../functions";
import CommentBody from "../CommentBody/CommentBody";
import CommentFooter from "../CommentFooter/CommentFooter";
import Button from "../../atoms/Button";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(styles);

function GameComment({ comment, children }) {
  return (
    <Box className={cx("game-comment")}>
      <CommentHeader className={cx("game-comment-header")}>
        <Box>
          <SpanLink className={cx("author")}>
            {comment.author.username}
          </SpanLink>
        </Box>
        <Box className={cx("date")}>
          {formattedDateString(comment.dt_created)}
        </Box>
      </CommentHeader>
      <CommentBody className={cx("game-comment-body")}>{children}</CommentBody>
      <CommentFooter>
        <Box>
          <Button className={cx("reply-comment-btn")}>
            답글
            {
              <span className={cx("children-count")}>
                {comment.children_count}
              </span>
            }{" "}
          </Button>
        </Box>
        <FlexBox></FlexBox>
      </CommentFooter>
    </Box>
  );
}

export default GameComment;
