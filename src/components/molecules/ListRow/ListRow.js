import React from "react";
import ListItem from "../../atoms/ListItem";
import FlexBox from "../../atoms/FlexBox";
import VCol from "../../atoms/VCol";
import classNames from "classnames/bind";
import style from "./ListRow.scss";

const cx = classNames.bind(style);

function ListRow({ className, style }) {
  return (
    <ListItem
      flex
      head
      alignItemsCenter
      className={cx("list-row", className)}
      style={style}
    >
      <FlexBox className="top">
        <VCol className={"sn"}>...</VCol>
        <VCol className={"title"}>제목</VCol>
      </FlexBox>
      <FlexBox>
        <VCol className={"author"}>작성자</VCol>
        <VCol className={"date"}>작성일</VCol>
        <VCol className={"hit"}>조회수</VCol>
        <VCol className={"rate"}>추천</VCol>
      </FlexBox>
    </ListItem>
  );
}

export default ListRow;
