import React from "react";
import classNames from "classnames/bind";
import styles from "./InputWrapper.scss";

const cp = classNames.bind(styles);

function InputWrapper({
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  border,
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={cp(
        "input-wrapper",
        {
          border,
          "border-top-left-radius": borderTopLeftRadius,
          "border-top-right-radius": borderTopRightRadius,
          "border-bottom-left-radius": borderBottomLeftRadius,
          "border-bottom-right-radius": borderBottomRightRadius,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default InputWrapper;
