// react imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";
import CommentTemplate from "../templates/comment.template";

function ChildComments(props) {
  // react hooks
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [counts, setCounts] = useState(null);

  // If updating data using useEffect, have to set trigger and request data in the useEffect Hook
  // Must have to unsubscribe after fetch data or axios.cancel
  // else use mount variables and return false after mounted
  useEffect(() => {
    const source = UserService.getCancelToken();

    const queryString = {
      parent: props.parent,
      page: nextPage,
      cancelToken: source.token,
    };
    // let mounted = true;
    UserService.getCommentList(location.pathname, queryString)
      .then((response) => {
        setLoaded(false);
        setLoading(true);
        // 다음 comments를 불러올 때 comments 자체를 안에서 밖에 쓰지 않는다면 함수형으로 작성한다.
        setComments((c) => {
          return [...c, ...response.data.results];
        });
        setCounts(response.data.count);
        setNextPageUrl(response.data.next);
        setLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        if (!UserService.isCancel(error)) {
          console.error(error);
        }
      });
    return () => {
      // mounted = false;
      // source.cancel();
      UserService.unsubscribe();
    };
  }, [location, props.parent, nextPage]);
  return (
    <div>
      {loading && <div>로딩중</div>}
      {loaded &&
        comments.map((comment, idx) => {
          return <Comment key={idx} comment={comment} onClickFunction={null} />;
        })}
      {loaded && counts > 10 && (
        <button
          onClick={() => {
            if (!nextPageUrl) return;
            setNextPage(nextPage + 1);
          }}
        >
          댓글 더보기
        </button>
      )}
    </div>
  );
}

function Comment(props) {
  return (
    <ul>
      <li>작성자: {props.comment.author}</li>
      <li>작성시간: {props.comment.dt_created}</li>
      <li>수정시간: {props.comment.dt_modified}</li>
      <li>내용: {props.comment.content}</li>
      {props.onClickFunction && (
        <li>
          <button onClick={props.onClickFunction}>
            {props.comment.children_count}개의 답글
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
      {!props.nullPage ? (
        <div>
          {props.comments.map((comment, idx) => {
            return (
              <div key={idx}>
                <Comment
                  comment={comment}
                  idx={idx}
                  onClickFunction={() => {
                    const currentCommentState = [...props.commentState];
                    currentCommentState[idx] = !props.commentState[idx];
                    props.setCommentState(currentCommentState);
                  }}
                />
                {props.commentState[idx] && (
                  <CommentTemplate parent={comment.id} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <ul>아직 댓글이 없습니다. 댓글을 써보세요!</ul>
      )}
      {props.loaded && props.nextPageUrl && (
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setNextPage(props.nextPage + 1);
            }}
          >
            다음 10개 더보기
          </button>
        </li>
      )}
      {props.loading && <div>로딩중...</div>}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
