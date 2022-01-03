import React from "react";
import classNames from "classnames";
import styles from "./ForumContent.scss";
import { Viewer } from "@toast-ui/react-editor";
import ArticleHeader from "../../molecules/ArticleHeader/ArticleHeader";
import TwinVoteBox from "../TwinVoteBox/TwinVoteBox";

const cx = classNames.bind(styles);

function ForumContent({
  article,
  vote,
  onLike,
  className,
  viewerRef,
  ...rest
}) {
  return (
    article.fetchSuccess && (
      <div className={cx("forum-content", className)} {...rest}>
        <ArticleHeader
          title={article.title}
          username={article.author.username}
          hit={article.hit}
          likes={vote.likes}
          dislikes={vote.dislikes}
          createdAt={article.createdAt}
          modifiedAt={article.modifiedAt}
        />
        <div className={cx("article-body")}>
          <Viewer ref={viewerRef} initialValue={article.content} />
        </div>
        <TwinVoteBox
          likes={vote.likes}
          dislikes={vote.dislikes}
          onLike={onLike}
          onDislike={onLike}
          userLiked={vote.userLiked.like}
          userDisLiked={vote.userLiked.dislike}
        />
      </div>
    )
  );
}

export default ForumContent;
