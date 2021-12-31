import React from "react";
import classNames from "classnames";
import styles from "./CommentBody.scss";
import Box from "../../atoms/Box";
const cx = classNames.bind(styles);

function CommentBody({ children, className, style, ...rest }) {
  return (
    <Box className={cx("comment-body", className)} {...rest}>
      {children}
    </Box>
  );
}

export default CommentBody;
