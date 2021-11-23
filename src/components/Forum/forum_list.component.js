import React from "react";

import "../../css/component/forum.component.scss";
import { Link } from "react-router-dom";

import { foramttedDateString } from "../../functions";

function ForumListComponent(props) {
  return (
    <article className="board_article">
      <h1>포럼</h1>
      <div className="list_table">
        <div className="vrow head">
          <div className="vrow__top">
            <div className="vcol col_id">...</div>
            <div className="vcol col_title">제목</div>
          </div>
          <div className="vrow__bottom">
            <div className="vcol col_author">작성자</div>
            <div className="vcol col_time">작성일</div>
            <div className="vcol col_hit">조회수</div>
            <div className="vcol col_rate">추천</div>
          </div>
        </div>
        {props.posts.map((article) => {
          return (
            <Link
              to={`/forum/article/${article.id}`}
              id={article.id}
              className="vrow"
              key={article.id}
            >
              <div className="vrow__top">
                <div className="vcol col_id">{article.id}</div>
                <div className="vcol col_title">{article.title}</div>
              </div>
              <div className="vrow__bottom">
                <div className="vcol col_author">{article.author.username}</div>
                <div className="vcol col_time">
                  <time dateTime={article.dt_created}></time>
                  {foramttedDateString(article.dt_created)}
                </div>
                <div className="vcol col_hit">{article.hit}</div>
                <div className="vcol col_rate">
                  {article.like_count - article.dislike_count}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </article>
  );
}

export default ForumListComponent;
