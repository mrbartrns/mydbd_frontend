import React from "react";
import classNames from "classnames";
import styles from "./ForumPostTemplate.scss";

const cx = classNames.bind(styles);

function ForumPostTemplate({ children }) {
  return <div className={cx("forum-post-template")}>{children}</div>;
}

export default ForumPostTemplate;
