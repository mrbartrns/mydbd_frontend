import React from "react";
import styles from "./Sep.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);

function Sep({ className }) {
  return <span className={cx("sep", className)} />;
}

export default Sep;
