import React from "react";
import classNames from "classnames";
import styles from "./ForumDetailTemplate.scss";

const cx = classNames.bind(styles);

function ForumDetailTemplate({ styles, classNames, children, ...rest }) {
  return (
    <div className={cx("forum-detail-template", classNames)} {...rest}>
      {children}
    </div>
  );
}

export default ForumDetailTemplate;
