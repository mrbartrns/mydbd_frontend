import React from "react";
import classNames from "classnames/bind";
import styles from "./Wrapper.scss";

const cp = classNames.bind(styles);

function Wrapper({
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  border,
  padding,
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={cp(
        "wrapper",
        {
          border,
          "border-top-left-radius": borderTopLeftRadius,
          "border-top-right-radius": borderTopRightRadius,
          "border-bottom-left-radius": borderBottomLeftRadius,
          "border-bottom-right-radius": borderBottomRightRadius,
          padding,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Wrapper;
