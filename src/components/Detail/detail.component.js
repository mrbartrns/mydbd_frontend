import React from "react";

// custom imports

// TODO: 필요한 기능부터 차근차근 넣기
// TODO: ListComponent처럼 detail componenet 나누기 -> CSS 처리 위함
function DetailComponent(props) {
  return props.loaded ? (
    <div className="content_box">
      <ul className="content">
        <li>이름: {props.post.name_kor}</li>
        <li>영문 이름: {props.post.name}</li>
        <li>이동 속도: {props.post.speed}</li>
        <li>
          <img
            src={
              props.post.images.length > 0 ? props.post.images[0].image : null
            }
            alt={props.post.name}
          />
        </li>
        <li>공포 범위: {props.post.terror_radius}m</li>
      </ul>
      <div className="like_box_container">
        <div className="like_box__like like_box" onClick={props.toggleLike}>
          <span>좋아요</span>
          <span>{props.articleLikeCount}</span>
        </div>
        <div
          className="like_box__dislike like_box"
          onClick={props.toggleDislike}
        >
          <span>싫어요</span>
          <span>{props.articleDislikeCount}</span>
        </div>
      </div>
    </div>
  ) : (
    <ul></ul>
  );
}

export default DetailComponent;
