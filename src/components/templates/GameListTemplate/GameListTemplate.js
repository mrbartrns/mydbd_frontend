import React from "react";
import classNames from "classnames";
import styles from "./GameListTemplate.scss";

const cx = classNames.bind(styles);

function GameListTemplate({ children }) {
  return <div className={cx("game-list-template")}>{children}</div>;
}

export default GameListTemplate;
