import React from "react";
import classNames from "classnames/bind";
import style from "./ForumListArea.scss";
import ListRow from "../../molecules/ListRow";
import ListItemLink from "../../atoms/ListItemLink";
import FlexBox from "../../atoms/FlexBox";
import VCol from "../../atoms/VCol";
import Paginator from "../../molecules/Paginator/Paginator";
import { formattedDateString } from "../../../functions";
import LinkButton from "../../atoms/LinkButton";

const cx = classNames.bind(style);

const rowStyle = {
  padding: "0.4rem 0.6rem",
};

function ForumListArea({
  className,
  postState,
  paginationState,
  onPrev,
  onNext,
  goTo,
  isLoggedIn,
  ...rest
}) {
  return (
    <div className={cx("forum-list-area", className)} {...rest}>
      <FlexBox className="forum-post-btn-group">
        {isLoggedIn && (
          <LinkButton className={cx("forum-post-btn")} to="/forum/post/write">
            글 쓰기
          </LinkButton>
        )}
      </FlexBox>
      <ListRow style={rowStyle} />
      {postState.list.map((post) => {
        return (
          <ListItemLink
            key={post.id}
            flex
            alignItemsCenter
            to={`/forum/article/${post.id}`}
            style={rowStyle}
          >
            <FlexBox className="top">
              <VCol className={"sn"}>{post.id}</VCol>
              <VCol className={"title"}>{post.title}</VCol>
            </FlexBox>
            <FlexBox>
              <VCol className={"author"}>{post.author.username}</VCol>
              <VCol className={"date"}>
                {formattedDateString(post.dt_created)}
              </VCol>
              <VCol className={"hit"}>{post.hit}</VCol>
              <VCol className={"rate"}>
                {post.like_count - post.dislike_count}
              </VCol>
            </FlexBox>
          </ListItemLink>
        );
      })}
      <FlexBox justifyContentCenter className={cx("article-paginator")}>
        <Paginator
          currentPage={paginationState.currentPage}
          startIndex={paginationState.startIndex}
          endIndex={paginationState.endIndex}
          onPrev={onPrev}
          onNext={onNext}
          goTo={goTo}
        />
      </FlexBox>
    </div>
  );
}

export default ForumListArea;
