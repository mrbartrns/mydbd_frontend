import React from "react";
import classNames from "classnames/bind";
import style from "./ForumListTemplate.scss";
import FlexBox from "../../atoms/FlexBox";
import LinkButton from "../../atoms/LinkButton";
import { connect } from "react-redux";
const cx = classNames.bind(style);

const titleStyle = {
  margin: "2rem 0",
};

function ForumListTemplate({ isLoggedIn, children }) {
  return (
    <div className={cx("forum-list-template")}>
      <FlexBox style={titleStyle} alignItemsCenter justifyContentSpaceBetween>
        <FlexBox alignItemsCenter>
          <h1 className={cx("board-title")}>포럼</h1>
          <p className={cx("board-description")}>
            데드바이데이라이트 관련 자유롭게 토론하는 공간
          </p>
        </FlexBox>
        <FlexBox>
          {isLoggedIn && <LinkButton to="/article/write">글 쓰기</LinkButton>}
        </FlexBox>
      </FlexBox>
      {children}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(ForumListTemplate);
