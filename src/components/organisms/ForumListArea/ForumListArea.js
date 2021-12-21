import React from "react";
import classNames from "classnames/bind";
import style from "./ForumListArea.scss";
import ListRow from "../../molecules/ListRow";
import ListItemLink from "../../atoms/ListItemLink";
import FlexBox from "../../atoms/FlexBox";
import VCol from "../../atoms/VCol";
import { formatedDateString } from "../../../functions";

const cx = classNames.bind(style);

function ForumListArea({ className, posts, ...rest }) {
  return (
    <div className={cx("forum-list-area", className)} {...rest}>
      <ListRow />
      {posts.map((post) => {
        return (
          <ListItemLink key={post.id}>
            <FlexBox>
              <VCol className={"sn"}>{post.id}</VCol>
              <VCol className={"title"}>{post.title}</VCol>
            </FlexBox>
            <FlexBox>
              <VCol className={"author"}>{post.author.username}</VCol>
              <VCol className={"time"}>
                {formatedDateString(post.dt_created)}
              </VCol>
              <VCol className={"hit"}>{post.hit}</VCol>
              <VCol className={"rate"}>
                {post.like_count - post.dislike_count}
              </VCol>
            </FlexBox>
          </ListItemLink>
        );
      })}
    </div>
  );
}

export default ForumListArea;
