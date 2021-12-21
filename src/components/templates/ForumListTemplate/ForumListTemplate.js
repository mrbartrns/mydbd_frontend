import React from "react";
import classNames from "classnames/bind";
import style from "./ForumListTemplate.scss";

const cx = classNames.bind(style);

function ForumListTemplate({ children }) {
  return <div className={cx("forum-list-template")}>{children}</div>;
}

export default ForumListTemplate;
