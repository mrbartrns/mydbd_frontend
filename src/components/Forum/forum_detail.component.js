import React from "react";

import "../../css/component/forum.component.scss";

function ForumDetailComponent(props) {
  return (
    <article className="board_article">
      <div className="article_wrapper">
        <div className="article_head">
          <div className="title_row">
            <div className="title">
              <span className="title_name">{props.article.title}</span>
            </div>
          </div>
          <div className="info_row">
            <div className="member_info">
              <span className="user_info">{props.article.author.username}</span>
            </div>
            <div className="article_info">
              <span className="article_info__head head">추천</span>
              <span className="article_info__body">
                {props.article.like_count}
              </span>
              <span className="sep"></span>
              <span className="article_info__head head">비추천</span>
              <span className="article_info__body">
                {props.article.dislike_count}
              </span>
              <span className="sep"></span>
              <span className="article_info__head head">조회수</span>
              <span className="article_info__body">{props.article.hit}</span>
              <span className="sep"></span>
              <span className="article_info__head head">작성일</span>
              <span className="article_info__body">
                {new Date(props.article.dt_created).toLocaleString()}
              </span>
              <span className="sep"></span>
              <span className="article_info__head head">수정일</span>
              <span className="article_info__body">
                {new Date(props.article.dt_modified).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="article_body">
          <div className="article_link"></div>
          <div className="article_content fr_view">{props.article.content}</div>
        </div>
      </div>
    </article>
  );
}

export default ForumDetailComponent;
