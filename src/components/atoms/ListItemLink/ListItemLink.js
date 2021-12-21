import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./ListItemLink.scss";

const cx = classNames.bind(style);

function ListItemLink({
  className,
  children,
  style,
  flex,
  head,
  justfyContentCenter,
  alignItemsCenter,
  to,
  ...rest
}) {
  return (
    <Link
      to={to}
      className={cx(
        "list-item-link",
        {
          "justify-content-center": justfyContentCenter,
          "algin-items-center": alignItemsCenter,
          head,
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

export default ListItemLink;
