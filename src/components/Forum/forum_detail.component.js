import React, { useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";

import "../../css/component/forum.component.scss";
import CommentTextarea from "../Comment/comment_textarea.component";
import VoteArea from "../VoteArea/vote_area.component";

function ForumDetailComponent(props) {
  const ref = useRef();
  // ref.current.getInstance().setMarkdown(props.content);
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
          <div className="article_content fr_view">
            <Viewer ref={ref} initialValue={props.article.content} />
          </div>
        </div>
        <VoteArea
          articleLikeCount={props.articleLikeCount}
          articleDislikeCount={props.articleDislikeCount}
          toggleLike={props.toggleLike}
          toggleDislike={props.toggleDislike}
          userLikeController={props.userLikeController}
        />
        <div className="article_comments">
          <div className="title">
            <span>{props.commentCounts}개의 댓글</span>
          </div>
          {/** Here goes article comment component */}
          <div className="list_area">
            {props.commentLoaded &&
              props.comments.map((comment) => {
                return (
                  // Wrapper contains comment id and it will be used to link
                  <div className="comment_wrapper" key={comment.id}>
                    {/** Comment list remove element */}
                    <div className="comment_item">
                      <div className="comment_content">
                        <div className="info_row">
                          <div className="member_info">
                            <span className="user_info">
                              {comment.author.username}
                            </span>
                          </div>
                          <div className="article_info">
                            <span className="article_info_datetime">
                              {new Date(comment.dt_created).toLocaleString()}
                            </span>
                            <span className="sep" />
                            <span className="article_info_delete">삭제</span>
                            <span className="sep" />
                            <span className="article_info_modify">수정</span>
                            <span className="sep" />
                            <span className="article_info_reply">답글</span>
                          </div>
                        </div>
                        <div className="message">
                          <div className="comment_text">
                            <span>{comment.content}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div onClick={props.loadNextCommentList}>추가 댓글 불러오기 </div>
      <form className="write_area" onSubmit={props.submitComment}>
        <div className="subtitle">댓글 작성</div>
        <div className="input_wrapper">
          <div className="comment_input">
            <CommentTextarea
              placeholder={"댓글을 입력하세요."}
              onChange={props.handleCommentChange}
              spellCheck={false}
              defaultValue={null}
            />
            <input type="submit" value="작성" />
          </div>
        </div>
      </form>
    </article>
  );
}

export default ForumDetailComponent;
