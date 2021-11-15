import React from "react";

import "../../css/component/forum.component.scss";
import { Link } from "react-router-dom";

function ForumListComponent(props) {
  return (
    <article className="board_article">
      <h1>포럼</h1>
      <div className="list_table">
        <div className="vrow head">
          <div className="vrow__top">
            <div className="vcol">번호</div>
            <div className="vcol">제목</div>
          </div>
          <div className="vrow__bottom">
            <div className="vcol">작성자</div>
            <div className="vcol">작성일</div>
            <div className="vcol">조회수</div>
            <div className="vcol">추천</div>
          </div>
        </div>
        {props.posts.map((article) => {
          return (
            <Link to="#" id={article.id} className="vrow" key={article.id}>
              <div className="vrow__top">
                <div className="vcol">{article.id}</div>
                <div className="vcol">{article.title}</div>
              </div>
              <div className="vrow__bottom">
                <div className="vcol">{article.author.username}</div>
                <div className="vcol">
                  {new Date(article.dt_created).toLocaleString()}
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
