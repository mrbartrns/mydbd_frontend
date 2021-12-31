import React from "react";
import classNames from "classnames";
import styles from "./GameCommentArea.scss";
import GameSubCommentContainer from "../../../containers/GameSubCommentContainer/GameSubCommentContainer";
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
    <div className={cx("game-comment-area", { parent })}>
      {/** comment list */}
      {commentState.fetchSuccess &&
        commentState.comments.map((comment) => {
          return (
            <GameSubCommentContainer
              key={comment.id}
              comment={comment}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      {/** pagination */}
      {/** comment form */}
    </div>
  );
}

export default GameCommentArea;
