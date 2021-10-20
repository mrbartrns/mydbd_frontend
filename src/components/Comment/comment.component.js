// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentTemplate from "../../templates/comment.template";
import Comment from "./form.component";

// css
import "../../css/component/comment.component.scss";

// TODO: CommentPagination 만들기

function CommentComponent(props) {
  return (
    <div className="comment-container">
      {/** Form Component */}
      {props.isLoggedIn && (
        <form
          className="comment__form"
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
          <div className="comment__form__input_area">
            {props.isLoggedIn && <label>{props.user.user.username}</label>}
            <textarea
              className={`comment__input ${props.isLoggedIn && "logined"}`}
              placeholder="댓글을 적으세요."
              onChange={props.handleContentChange}
            />
          </div>
          <div className="comment__form__submit_area">
            <input
              className="comment__submit_btn"
              type="submit"
              value="댓글 적기"
            />
          </div>
        </form>
      )}
      {/** CommentComponent */}

      {!props.nullPage && props.comments.length > 0 ? (
        <ul className={`comment__box ${!props.parent && "first"}`}>
          {props.comments.map((comment, idx) => {
            return (
              <li className="comment__box__comment" key={idx}>
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
              </li>
            );
          })}
        </ul>
      ) : (
        props.loaded && (
          <ul>
            <li>아직 댓글이 없습니다. 댓글을 써보세요!</li>
          </ul>
        )
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
