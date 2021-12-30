import React from "react";
import classNames from "classnames";
import styles from "./GameDetailTemplate.scss";

const cx = classNames.bind(styles);

function GameDetailTemplate({ children }) {
  return <div className={cx("game-detail-template")}>{children}</div>;
}

export default GameDetailTemplate;
