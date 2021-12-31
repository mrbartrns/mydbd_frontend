import React from "react";
import classNames from "classnames";
import styles from "./CommentHeader.scss";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(styles);

function CommentHeader({ className, children, style, ...rest }) {
  return (
    <FlexBox
      justifyContentSpaceBetween
      className={cx("comment-header", className)}
      style={style}
      {...rest}
    >
      {children}
    </FlexBox>
  );
}

export default CommentHeader;
