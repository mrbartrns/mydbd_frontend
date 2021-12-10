import React from "react";

import CommentWrapper from "./articleCommentWrapper.component";
import Paginator from "../Paginator/paginator.component";

function ArticleCommentList({
  commentState,
  onUpdate,
  onSubmit,
  onDelete,
  paginationState,
  onNext,
  onPrev,
  goTo,
  replyFormKey,
  setReplyFormKey,
  updateFormKey,
  setUpdateFormKey,
}) {
  return (
    <div className="list_area">
      {commentState.comments.map((comment) => {
        return (
          // Wrapper contains comment id and it will be used to link
          <CommentWrapper
            key={comment.id}
            comment={comment}
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            onDelete={onDelete}
            replyFormKey={replyFormKey}
            setReplyFormKey={setReplyFormKey}
            updateFormKey={updateFormKey}
            setUpdateFormKey={setUpdateFormKey}
          />
        );
      })}
      <Paginator
        pageSize={paginationState.pageSize}
        currentPage={paginationState.currentPage}
        offset={paginationState.offset}
        count={paginationState.count}
        startIndex={paginationState.startIndex}
        endIndex={paginationState.endIndex}
        goTo={goTo}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}

export default ArticleCommentList;
