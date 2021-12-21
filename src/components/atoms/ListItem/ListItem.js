import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ListItem.scss";

const cx = classNames.bind(style);

function ListItem({
  className,
  children,
  style,
  flex,
  head,
  alignItemsCenter,
  ...rest
}) {
  return (
    <div
      className={cx(
        "list-item",
        {
          "algin-items-center": alignItemsCenter,
          head,
          flex,
        },
        className
      )}
      style={style ? style : null}
      {...rest}
    >
      {children}
    </div>
  );
}

export default ListItem;
