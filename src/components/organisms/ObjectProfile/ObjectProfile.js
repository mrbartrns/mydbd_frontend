import React from "react";
import FlexBox from "../../atoms/FlexBox";
import Box from "../../atoms/Box";
import classNames from "classnames";
import styles from "./ObjectProfile.scss";
import TwinVoteBox from "../TwinVoteBox/TwinVoteBox";

const cx = classNames.bind(styles);
const imgHolderUrl = "http://placehold.it/400x600";

function ObjectProfile({ profileState, voteState, onLike, ...rest }) {
  return (
    <Box className={cx("object-profile")}>
      {profileState.fetchSuccess && (
        <FlexBox>
          <Box className={cx("image-box")}>
            <h2>사진</h2>
            <img src={imgHolderUrl} alt="placeholder" />
          </Box>
          <Box>
            <h2>정보</h2>
            {Object.keys(profileState.content).map((_key, index) => {
              return (
                <p key={index}>
                  {_key}: {profileState.content[_key]}
                </p>
              );
            })}
          </Box>
        </FlexBox>
      )}
      <TwinVoteBox
        likes={voteState.likes}
        dislikes={voteState.dislikes}
        onLike={onLike}
        onDislike={onLike}
        userLiked={voteState.userLiked.like}
        userDisLiked={voteState.userLiked.dislike}
      />
    </Box>
  );
}

export default ObjectProfile;
