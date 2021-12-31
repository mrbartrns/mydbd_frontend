import React from "react";
import classNames from "classnames";
import styles from "./GameCommentArea.scss";
import GameSubCommentContainer from "../../../containers/GameSubCommentContainer/GameSubCommentContainer";
import FlexBox from "../../atoms/FlexBox";
import Paginator from "../../molecules/Paginator";
import { Form } from "react-bootstrap";
import CommentTextArea from "../../molecules/CommentTextArea";

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
    // loading이 덜 되어 드르륵 열리는 문제를 방지하기 위하여 fetchSuccess 후에만 열리도록 한다.
    <div className={cx("game-comment-area", { child: parent })}>
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
      {commentState.fetchSuccess && (
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
      )}

      {/** comment form */}
      {commentState.fetchSuccess && (
        <Form
          className={cx("game-comment-form", { child: parent })}
          onSubmit={
            onSubmit
              ? (e) => {
                  e.preventDefault();
                  onSubmit(commentState.inputs);
                }
              : null
          }
        >
          <p>의견 쓰기</p>
          <CommentTextArea
            required
            onChange={onChange ? (e) => onChange(e, parent) : null}
            value={commentState.inputs.content}
          />
        </Form>
      )}
    </div>
  );
}

export default GameCommentArea;
