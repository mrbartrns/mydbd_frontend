import React from "react";
import classNames from "classnames";
import styles from "./ForumDetailTemplate.scss";
import ListItem from "../../atoms/ListItem";

const cx = classNames.bind(styles);

const titleStyle = {
  margin: "2rem 0",
};

function ForumDetailTemplate({ styles, classNames, children, ...rest }) {
  return (
    <div className={cx("forum-detail-template", classNames)} {...rest}>
      <ListItem style={titleStyle} flex flexStart alignItemsCenter>
        <h1 className={cx("board-title")}>포럼</h1>
        <p className={cx("board-description")}>
          데드바이데이라이트 관련 자유롭게 토론하는 공간
        </p>
      </ListItem>
      {children}
    </div>
  );
}

export default ForumDetailTemplate;
