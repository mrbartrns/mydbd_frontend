import React, { useState, useEffect } from "react";

// custom imports
import CommentPaginator from "../CommentPaginator.js";

function DetailComponent(props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  console.log(props.comments);
  useEffect(() => {
    setImgLoaded(props.post.images ? true : false);
  }, [props.post.images]);
  // console.log(props.loaded && imgArr.length > 0 ? imgArr[imgIdx] : null);
  return (
    <div>
      {props.loaded && imgLoaded && (
        <ul>
          <li>이름: {props.post.name_kor}</li>
          <li>영문 이름: {props.post.name}</li>
          <li>이동 속도: {props.post.speed}</li>
          <li>
            이미지:
            <img alt={props.post.name} src={props.post.images[imgIdx].image} />
          </li>
          <li>공포 범위: {props.post.terror_radius}m</li>
        </ul>
      )}
      {props.loaded && props.comments.length > 0 && (
        <div>
          댓글
          {props.comments.map((data, idx) => {
            return <li key={idx}>{data.content}</li>;
          })}
        </div>
      )}
      {props.comments.length > 0 && <CommentPaginator />}
    </div>
  );
}

export default DetailComponent;
