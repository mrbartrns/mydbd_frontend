import React from "react";
import classNames from "classnames/bind";
import style from "./ForumListTemplate.scss";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(style);

const titleStyle = {
  margin: "2rem 0",
};

function ForumListTemplate({ children }) {
  return (
    <div className={cx("forum-list-template")}>
      <FlexBox style={titleStyle} alignItemsCenter justifyContentSpaceBetween>
        <FlexBox alignItemsCenter>
          <h1 className={cx("board-title")}>포럼</h1>
          <p className={cx("board-description")}>
            데드바이데이라이트 관련 자유롭게 토론하는 공간
          </p>
        </FlexBox>
      </FlexBox>
      {children}
    </div>
  );
}

export default ForumListTemplate;
