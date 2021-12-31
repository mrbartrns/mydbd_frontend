import React from "react";
import classNames from "classnames";
import styles from "./GameCommentArea.scss";
import GameSubCommentContainer from "../../../containers/GameSubCommentContainer/GameSubCommentContainer";
import FlexBox from "../../atoms/FlexBox";
import Paginator from "../../molecules/Paginator";

const cx = classNames.bind(styles);

function GameCommentArea({
  commentState,
  paginationState,
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
      <FlexBox className={cx("comment-paginator-box")}>
        {commentState.fetchSuccess && paginationState.count > 1 && (
          <Paginator
            currentPage={paginationState.currentPage}
            offset={paginationState.offset}
            startIndex={paginationState.startIndex}
            endIndex={paginationState.endIndex}
            count={paginationState.count}
            pageSize={paginationState.pageSize}
            onNext={onNext}
            onPrev={onPrev}
            goTo={goTo}
          />
        )}
      </FlexBox>
      {/** comment form */}
    </div>
  );
}

export default GameCommentArea;
