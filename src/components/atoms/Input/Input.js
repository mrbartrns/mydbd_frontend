import React from "react";
import classNames from "classnames/bind";
import styles from "./Input.scss";

const cx = classNames.bind(styles);

function Input({ big, fullWidth, className, ...rest }) {
  return (
    <input
      className={cx("input", { big, "full-width": fullWidth }, className)}
      {...rest}
    />
  );
}

export default Input;
