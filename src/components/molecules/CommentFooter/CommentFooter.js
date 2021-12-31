import React from "react";
import classNames from "classnames";
import styles from "./CommentFooter.scss";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(styles);

function CommentFooter({ children, style, className, ...rest }) {
  return (
    <FlexBox
      justifyContentSpaceBetween
      className={cx("comment-footer", className)}
      style={style}
      {...rest}
    >
      {children}
    </FlexBox>
  );
}

export default CommentFooter;
