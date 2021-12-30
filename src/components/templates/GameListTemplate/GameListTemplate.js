import React from "react";
import classNames from "classnames";
import styles from "./GameListTemplate.scss";
import ListItem from "../../atoms/ListItem";

const cx = classNames.bind(styles);

const titleStyle = {
  margin: "2rem 0",
};

function GameListTemplate({ category, children }) {
  return (
    <div className={cx("game-list-template")}>
      <ListItem style={titleStyle} flex flexStart alignItemsCenter>
        <h1 className={cx("board-title")}>{category} 리스트</h1>
        <p className={cx("list-description")}>{category} 정보를 찾아보세요.</p>
      </ListItem>
      {children}
    </div>
  );
}

export default GameListTemplate;
