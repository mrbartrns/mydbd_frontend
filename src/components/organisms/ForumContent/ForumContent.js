import React from "react";
import classNames from "classnames";
import styles from "./ForumContent.scss";
import { Viewer } from "@toast-ui/react-editor";
import ArticleHeader from "../../molecules/ArticleHeader/ArticleHeader";
import TwinVoteBox from "../TwinVoteBox/TwinVoteBox";
import FlexBox from "../../atoms/FlexBox";
import LinkButton from "../../atoms/LinkButton";

const cx = classNames.bind(styles);

function ForumContent({
  article,
  vote,
  onLike,
  className,
  viewerRef,
  isAuthenticated,
  path,
  isLoggedIn,
  ...rest
}) {
  return (
    article.fetchSuccess && (
      <div className={cx("forum-content", className)} {...rest}>
        <FlexBox className="forum-post-btn-group">
          {isLoggedIn && isAuthenticated && (
            <LinkButton className={cx("forum-post-btn")} to={`${path}/edit`}>
              글 수정
            </LinkButton>
          )}
          {isLoggedIn && (
            <LinkButton className={cx("forum-post-btn")} to="/forum/post/write">
              글 쓰기
            </LinkButton>
          )}
        </FlexBox>
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
