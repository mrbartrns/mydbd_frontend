import React from "react";
import classNames from "classnames";
import styles from "./GameDetailTemplate.scss";
import ListItem from "../../atoms/ListItem";

const cx = classNames.bind(styles);

const titleStyle = {
  margin: "2rem 0",
};

function GameDetailTemplate({ children }) {
  return (
    <div className={cx("game-detail-template")}>
      <ListItem style={titleStyle} flex flexStart alignItemsCenter>
        <h1 className={cx("board-title")}>프로필</h1>
        <p className={cx("detail-description")}>
          모든 게임 관련 프로필을 찾아볼 수 있습니다.
        </p>
      </ListItem>
      {children}
    </div>
  );
}

export default GameDetailTemplate;
