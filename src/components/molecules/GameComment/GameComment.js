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

function GameComment({ comment, onToggle, onUpdate, onDelete, children }) {
  return (
    <Box className={cx("game-comment", { child: comment.parent })}>
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
          {!comment.parent && (
            <Button className={cx("reply-comment-btn")} onClick={onToggle}>
              답글
              {
                <span className={cx("children-count")}>
                  {comment.children_count}
                </span>
              }{" "}
            </Button>
          )}
        </Box>
        <FlexBox>Test component {/** onDelete, onUpdate */}</FlexBox>
      </CommentFooter>
    </Box>
  );
}

export default GameComment;
