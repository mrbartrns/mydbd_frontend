import React from "react";
import ListItem from "../../atoms/ListItem";
import FlexBox from "../../atoms/FlexBox";
import VCol from "../../atoms/VCol";

function ListRow({ className, children, ...rest }) {
  return (
    <ListItem flex head alignItemsCenter={true}>
      <FlexBox>
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
