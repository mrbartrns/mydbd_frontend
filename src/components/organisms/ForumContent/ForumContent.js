import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./ForumContent.scss";
import { Viewer } from "@toast-ui/react-editor";

const cx = classNames.bind(styles);

function ForumContent({ article, vote, className, ...rest }) {
  const viewerRef = useRef();
  return (
    <div className={cx("forum-content", className)} {...rest}>
      {article.fetchSuccess && <div></div>}
    </div>
  );
}

export default ForumContent;
