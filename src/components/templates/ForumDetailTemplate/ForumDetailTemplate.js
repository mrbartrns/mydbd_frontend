import React from "react";
import classNames from "classnames";
import styles from "./ForumDetailTemplate.scss";
import FlexBox from "../../atoms/FlexBox";

const cx = classNames.bind(styles);

const titleStyle = {
  margin: "2rem 0",
};

function ForumDetailTemplate({ styles, className, children, ...rest }) {
  return (
    <div className={cx("forum-detail-template", className)} {...rest}>
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

export default ForumDetailTemplate;
