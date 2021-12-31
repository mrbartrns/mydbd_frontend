import React, { useState, useCallback } from "react";
import GameCommentWrapper from "../../components/molecules/GameCommentWrapper";
import GameComment from "../../components/molecules/GameComment";
import GameCommentContainer from "../GameCommentContainer/GameCommentContainer";

function GameSubCommentContainer({ comment, onUpdate, onDelete }) {
  const [toggle, setToggle] = useState(false);
  const onToggle = useCallback(() => {
    setToggle((prev) => {
      return !prev;
    });
  }, []);
  return (
    <GameCommentWrapper>
      <GameComment
        onToggle={onToggle}
        comment={comment}
        onUpdate={onUpdate}
        onDelete={onDelete}
      >
        {comment.content}
      </GameComment>
      {toggle && !comment.parent && (
        <GameCommentContainer parent={comment.id} />
      )}
    </GameCommentWrapper>
  );
}

export default GameSubCommentContainer;
