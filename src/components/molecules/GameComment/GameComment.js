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
      <CommentHeader>
        <Box>
          <SpanLink>{comment.author.username}</SpanLink>
        </Box>
        <Box>{formattedDateString(comment.dt_created)}</Box>
      </CommentHeader>
      <CommentBody>{children}</CommentBody>
      <CommentFooter>
        <Box>
          <Button>답글</Button>
        </Box>
        <FlexBox></FlexBox>
      </CommentFooter>
    </Box>
  );
}

export default GameComment;
