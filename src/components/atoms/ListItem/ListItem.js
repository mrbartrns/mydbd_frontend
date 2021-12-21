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
  justfyContentCenter,
  alignItemsCenter,
  to,
  ...rest
}) {
  return (
    <Link
      to={to}
      className={cx(
        "list-item",
        {
          "justify-content-center": justfyContentCenter,
          "algin-items-center": alignItemsCenter,
        },
        className
      )}
      style={style ? style : null}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default ListItem;
