import React from "react";
import classNames from "classnames";
import styles from "./GameCommentWrapper.scss";
import GameCommentContainer from "../../../containers/GameCommentContainer/GameCommentContainer";

const cx = classNames.bind(styles);

function GameCommentWrapper({ children, parent, root }) {
  return (
    <div className={cx("game-comment-wrapper")}>
      {children}
      {root && <GameCommentContainer parent={parent} />}
    </div>
  );
}
export default GameCommentWrapper;
