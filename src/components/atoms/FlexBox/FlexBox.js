import React from "react";
import classNames from "classnames/bind";
import style from "./FlexBox.scss";

const cx = classNames.bind(style);

function FlexBox({
  className,
  justifyContentCenter,
  alignItemsCenter,
  children,
  ...rest
}) {
  return (
    <div
      className={cx(
        "flex-box",
        {
          "justify-content-center": justifyContentCenter,
          "align-items-center": alignItemsCenter,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default FlexBox;
