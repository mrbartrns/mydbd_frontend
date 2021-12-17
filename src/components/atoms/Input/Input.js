import React from "react";
import classNames from "classnames/bind";
import styles from "./Input.scss";

const cx = classNames.bind(styles);

function Input({ big, fullWidth, borderNone, className, ...rest }) {
  return (
    <input
      className={cx(
        "input",
        { big, "full-width": fullWidth, "border-none": borderNone },
        className
      )}
      {...rest}
    />
  );
}

export default Input;
