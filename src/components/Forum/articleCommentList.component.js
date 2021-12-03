import React from "react";

import CommentWrapper from "./articleCommentWrapper.component";

function ArticleCommentList({ commentState, onUpdate, onSubmit, onDelete }) {
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
          />
        );
      })}
    </div>
  );
}

export default ArticleCommentList;
