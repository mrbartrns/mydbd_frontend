// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentTemplate from "../../templates/comment.template";

// css

function Comment(props) {
  return (
    <ul>
      <li>작성자: {props.comment.author}</li>
      <li>작성시간: {props.comment.dt_created}</li>
      <li>수정시간: {props.comment.dt_modified}</li>
      <li>내용: {props.comment.content}</li>
      {!props.comment.parent && (
        <li>
          <button onClick={props.onClickFunction}>
            {props.comment.children_count}개의 답글{" "}
            {!props.state ? "보기" : "닫기"}
          </button>
        </li>
      )}
    </ul>
  );
}

function CommentComponent(props) {
  return (
    <div>
      {/* TODO: separate form from CommentComponent and create new Component */}
      {/** Form Component */}
      {props.isLoggedIn && (
        <form
          onSubmit={(e) => {
            if (!props.isLoggedIn) {
              e.preventDefault();
            }
            props.submitComment({
              parent: props.parent,
              content: props.content,
            });
          }}
        >
          <textarea
            placeholder="댓글을 적으세요."
            onChange={props.handleContentChange}
          />
          <input type="submit" value="댓글 적기" />
        </form>
      )}
      {/** CommentComponent */}

      {!props.nullPage && props.comments.length > 0 ? (
        <div>
          {props.comments.map((comment, idx) => {
            return (
              <div key={idx}>
                <Comment
                  comment={comment}
                  state={props.commentState[idx]}
                  idx={idx}
                  onClickFunction={() => {
                    props.toggleCommentBtn(idx);
                  }}
                />
                {props.commentState[idx] && !comment.parent && (
                  <CommentTemplate parent={comment.id} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>아직 댓글이 없습니다. 댓글을 써보세요!</div>
      )}
      {props.loaded && props.nextPageUrl && (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setNextPage(props.nextPage + 1);
            }}
          >
            다음 10개 더보기
          </button>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
