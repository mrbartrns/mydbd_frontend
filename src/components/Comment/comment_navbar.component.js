import React from "react";

// css
import "../../css/component/comment.component.scss";

function CommentNavbar(props) {
  // functions
  function setRecentSort() {
    props.setSortBy("recent");
  }

  function handleRefresh() {
    props.setRefresh(!props.refresh);
  }

  return (
    <ul className="comment_navbar">
      <li className={props.sortBy === "popular" ? "current" : null}>인기순</li>
      <li
        className={props.sortBy === "recent" ? "current" : null}
        style={{ cursor: "pointer" }}
        onClick={setRecentSort}
      >
        최신순
      </li>
      <li onClick={handleRefresh}>새로고침</li>
    </ul>
  );
}

export default CommentNavbar;
