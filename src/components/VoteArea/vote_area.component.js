import React from "react";

import "../../css/component/vote_area.component.scss";

function VoteArea(props) {
  return (
    <div className="vote_container">
      <div
        className={`like vote_box${
          props.voteState.userLiked.like ? " toggled" : ""
        }`}
        onClick={(e) => {
          props.toggleLike({ like: true, dislike: false });
        }}
      >
        <span>좋아요</span>
        <span>{props.voteState.likes}</span>
      </div>
      <div
        className={`dislike vote_box${
          props.voteState.userLiked.dislike ? " toggled" : ""
        }`}
        onClick={(e) => {
          props.toggleDislike({ like: false, dislike: true });
        }}
      >
        <span>싫어요</span>
        <span>{props.voteState.dislikes}</span>
      </div>
    </div>
  );
}

export default VoteArea;
