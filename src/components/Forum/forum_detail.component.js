import React, { useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";

import "../../css/component/forum.component.scss";
import ArticleHead from "./articleHead.component";
import CommentTextarea from "../Comment/comment_textarea.component";
import VoteArea from "../VoteArea/vote_area.component";
import ArticleCommentList from "./articleCommentList.component";

function ForumDetailComponent({
  articleState,
  commentState,
  voteState,
  onLike,
  onSubmit,
  onChange,
  onDelete,
  onUpdate,
  paginationState,
  goTo,
  onNext,
  onPrev,
  replyFormKey,
  setReplyFormKey,
  updateFormKey,
  setUpdateFormKey,
}) {
  const ref = useRef();
  return (
    <article className="board_article">
      {articleState.fetchSuccess && commentState.fetchSuccess && (
        <div className="article_wrapper">
          {/** Article 정보 표시 컴포넌트 */}
          <ArticleHead
            title={articleState.title}
            username={articleState.author.username}
            likes={articleState.likes}
            dislikes={voteState.dislikes}
            hit={articleState.hit}
            createdAt={articleState.createdAt}
            modifiedAt={articleState.modifiedAt}
          />
          <div className="article_body">
            <div className="article_link"></div>
            <div className="article_content fr_view">
              <Viewer ref={ref} initialValue={articleState.content} />
            </div>
          </div>
          <VoteArea
            voteState={voteState}
            toggleLike={onLike}
            toggleDislike={onLike}
          />
          <div className="article_comments">
            <div className="title">
              <span>{commentState.count}개의 댓글</span>
            </div>
            {/** Here goes article comment component */}
            <ArticleCommentList
              commentState={commentState}
              paginationState={paginationState}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onSubmit={onSubmit}
              goTo={goTo}
              onPrev={onPrev}
              onNext={onNext}
              replyFormKey={replyFormKey}
              setReplyFormKey={setReplyFormKey}
              updateFormKey={updateFormKey}
              setUpdateFormKey={setUpdateFormKey}
            />
          </div>
        </div>
      )}
      <form
        className="write_area"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(commentState.inputs);
        }}
      >
        <div className="subtitle">댓글 작성</div>
        <div className="input_wrapper">
          <div className="comment_input">
            <CommentTextarea
              placeholder={"댓글을 입력하세요."}
              onChange={(e) => {
                onChange(e, null);
              }}
              spellCheck={false}
              value={commentState.inputs.content}
            />
            <input type="submit" value="작성" />
          </div>
        </div>
      </form>
    </article>
  );
}

export default ForumDetailComponent;
