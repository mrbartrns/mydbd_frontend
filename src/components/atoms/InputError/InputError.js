import React from "react";
import classNames from "classnames/bind";
import styles from "./InputError.scss";

const cx = classNames.bind(styles);

function InputError({ className, error, ...rest }) {
  if (!error) return null;
  return (
    <div className={cx("input-error", className)} {...rest}>
      {error}
    </div>
  );
}

export default InputError;
