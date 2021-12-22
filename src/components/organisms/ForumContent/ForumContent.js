import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./ForumContent.scss";
import { Viewer } from "@toast-ui/react-editor";
import ArticleHeader from "../../molecules/ArticleHeader/ArticleHeader";

const cx = classNames.bind(styles);

function ForumContent({ article, vote, className, ...rest }) {
  const viewerRef = useRef();
  return (
    article.fetchSuccess && (
      <div className={cx("forum-content", className)} {...rest}>
        <ArticleHeader
          title={article.title}
          username={article.author.username}
          likes={vote.likes}
          dislikes={vote.dislikes}
          createdAt={article.createdAt}
          modifiedAt={article.modifiedAt}
        />
        <div className={cx("article-body")}>
          <Viewer ref={viewerRef} initialValue={article.content} />
        </div>
      </div>
    )
  );
}

export default ForumContent;
