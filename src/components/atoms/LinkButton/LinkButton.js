import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./LinkButton.scss";

const cx = classNames.bind(styles);

function LinkButton({ children, className, style, ...rest }) {
  return (
    <Link className={cx("link-btn", className)} {...rest} style={style}>
      {children}
    </Link>
  );
}

export default LinkButton;
