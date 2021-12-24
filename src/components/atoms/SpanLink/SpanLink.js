import React from "react";
import classNames from "classnames";
import styles from "./SpanLink.scss";

const cx = classNames.bind(styles);

function SpanLink({ className, children, onClick, ...rest }) {
  return (
    <span
      className={cx("span-link")}
      onClick={onClick ? onClick : undefined}
      {...rest}
    >
      {children}
    </span>
  );
}

export default SpanLink;
