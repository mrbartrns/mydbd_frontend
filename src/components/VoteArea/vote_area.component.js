import React from "react";

import "../../css/component/vote_area.component.scss";

function VoteArea(props) {
  return (
    <div className="vote_container">
      <div
        className={`like vote_box${
          props.userLikeController.like ? " toggled" : ""
        }`}
        onClick={props.toggleLike}
      >
        <span>좋아요</span>
        <span>{props.articleLikeCount}</span>
      </div>
      <div
        className={`dislike vote_box${
          props.userLikeController.dislike ? " toggled" : ""
        }`}
        onClick={props.toggleDislike}
      >
        <span>싫어요</span>
        <span>{props.articleDislikeCount}</span>
      </div>
    </div>
  );
}

export default VoteArea;
