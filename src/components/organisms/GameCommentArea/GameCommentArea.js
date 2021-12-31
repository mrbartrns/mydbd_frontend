import React from "react";
import classNames from "classnames";
import styles from "./GameCommentArea.scss";
import GameComment from "../../molecules/GameComment";
const cx = classNames.bind(styles);

function GameCommentArea({
  commentState,
  pagiantionState,
  onNext,
  onPrev,
  goTo,
  onUpdate,
  onSubmit,
  onDelete,
  onChange,
  parent,
}) {
  return (
    <div className={cx("game-comment-area")}>
      {/** comment list */}
      {commentState.fetchSuccess &&
        commentState.comments.map((comment) => {
          return (
            <GameComment key={comment.id} comment={comment}>
              {comment.content}
            </GameComment>
          );
        })}
      {/** pagination */}
      {/** comment form */}
    </div>
  );
}

export default GameCommentArea;
