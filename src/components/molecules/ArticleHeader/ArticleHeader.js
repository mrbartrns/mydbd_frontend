import React from "react";
import FlexBox from "../../atoms/FlexBox";
import VCol from "../../atoms/VCol";
import Sep from "../../atoms/Sep";
import classNames from "classnames";
import styles from "./ArticleHeader.scss";
import { formattedDateString } from "../../../functions";

const cx = classNames.bind(styles);

function ArticleHeader({
  title,
  username,
  createdAt,
  modifiedAt,
  likes,
  dislikes,
  hit,
  className,
}) {
  return (
    <div className={cx("article-header", className)}>
      <FlexBox className={cx("article-title")} alignItemsCenter>
        <VCol>{title}</VCol>
      </FlexBox>
      <FlexBox
        alignItemsCenter
        justifyContentSpaceBetween
        className={cx("article-info")}
      >
        <FlexBox>
          <VCol>{username}</VCol>
        </FlexBox>
        <FlexBox alignItemsCenter>
          <VCol head>추천</VCol>
          <VCol>{likes}</VCol>
          <Sep />
          <VCol head>비추천</VCol>
          <VCol>{dislikes}</VCol>
          <Sep />
          <VCol head>조회수</VCol>
          <VCol>{hit}</VCol>
          <Sep />
          <VCol head>작성일</VCol>
          <VCol>{formattedDateString(createdAt)}</VCol>
          <Sep />
          <VCol head>수정일</VCol>
          <VCol>{formattedDateString(modifiedAt)}</VCol>
        </FlexBox>
      </FlexBox>
    </div>
  );
}

export default ArticleHeader;
