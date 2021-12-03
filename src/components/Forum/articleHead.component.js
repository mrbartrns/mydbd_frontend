import React from "react";

function ArticleHead({
  title,
  username,
  createdAt,
  modifiedAt,
  likes,
  dislikes,
  hit,
}) {
  return (
    <div className="article_head">
      <div className="title_row">
        <div className="title">
          <span className="title_name">{title}</span>
        </div>
      </div>
      <div className="info_row">
        <div className="member_info">
          <span className="user_info">{username}</span>
        </div>
        <div className="article_info">
          <span className="article_info__head head">추천</span>
          <span className="article_info__body">{likes}</span>
          <span className="sep"></span>
          <span className="article_info__head head">비추천</span>
          <span className="article_info__body">{dislikes}</span>
          <span className="sep"></span>
          <span className="article_info__head head">조회수</span>
          <span className="article_info__body">{hit}</span>
          <span className="sep"></span>
          <span className="article_info__head head">작성일</span>
          <span className="article_info__body">
            {new Date(createdAt).toLocaleString()}
          </span>
          <span className="sep"></span>
          <span className="article_info__head head">수정일</span>
          <span className="article_info__body">
            {new Date(modifiedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticleHead;
