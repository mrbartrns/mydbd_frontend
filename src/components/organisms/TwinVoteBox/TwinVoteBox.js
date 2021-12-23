import React from "react";
import classNames from "classnames";
import styles from "./TwinVoteBox.scss";
import FlexBox from "../../atoms/FlexBox";
import VoteBox from "../../molecules/VoteBox";
import Box from "../../atoms/Box/Box";

const cx = classNames.bind(styles);

const voteBoxStyle = {
  margin: `0 1.5rem`,
  textAlign: "center",
};

function TwinVoteBox({
  className,
  voted,
  likes,
  dislikes,
  style,
  onLike,
  onDislike,
  ...rest
}) {
  return (
    <FlexBox className={cx("twin-vote-box")} style={style} {...rest}>
      <VoteBox
        style={voteBoxStyle}
        onClick={() => onLike({ like: true, dislike: false })}
      >
        <Box fullWidth>좋아요</Box>
        <Box fullWidth>{likes}</Box>
      </VoteBox>
      <VoteBox
        style={voteBoxStyle}
        onClick={() => onDislike({ like: false, dislike: true })}
      >
        <Box fullWidth>싫어요</Box>
        <Box fullWidth>{dislikes}</Box>
      </VoteBox>
    </FlexBox>
  );
}

export default TwinVoteBox;
