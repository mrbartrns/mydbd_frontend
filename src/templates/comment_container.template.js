// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";

// custom imports
import CommentComponent from "../components/Comment/comment_component.component";
import UserService from "../services/user.service";

/**
 * CommentTemplate는 parent comment를 api로부터 불러온다.
 * 댓글은 처음 10개를 불러온 뒤, nextPage가 변화함에 따라 댓글을 불러온다.
 * 만약 댓글의 정렬 순서가 바뀌었을 경우, 처음부터 다시 로드(댓글 다시 채우기)
 */
function CommentContainerTemplate(props) {
  // constants
  const location = useLocation();

  // states
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [nullPage, setNullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent"); // TODO: change default value to like after api is ready
  const [counts, setCounts] = useState(null); // store total comment counts
  const [refresh, setRefresh] = useState(false); // page=1, sortby=recent 일때 post 후 refresh를 위한 state

  // functions

  function refreshAfterDeleteComment(commentId) {
    // comment delete function without refreshing current page
    // USE JAVASCRIPT Array.filter FUNCTION WHEN REMOVE ELEMENT
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  // useEffect
  useEffect(() => {
    const source = UserService.getCancelToken();

    // set query to get comments
    const queries = {};
    queries["parent"] = props.parent || null;
    queries["page"] = currentPage;
    queries["sortby"] = sortBy;
    queries["cancelToken"] = source.token;
    let mounted = true;
    if (mounted) {
      setLoaded(false);
      setNullPage(false);

      // TODO: useEffect 내부에서 무엇을 이용하여 새로고침 할 지 생각하기
      UserService.getCommentList(location.pathname, queries)
        .then((response) => {
          setLoading(true);
          setComments(response.data.results);
          setCounts(response.data.count);
          setLoaded(true);
          setLoading(false);
          console.log(currentPage);
        })
        .catch((error) => {
          // if page not have contents -> display null page
          // parent who doesn't have child -> not error, just null
          if (!UserService.isCancel(error)) {
            console.error(error);
          }
          // TODO: dispatch set message
          setLoaded(true);
          setNullPage(true);
        });
    }

    return () => {
      mounted = false;
      UserService.unsubscribe();
    };
  }, [location, props.parent, currentPage, sortBy, refresh]);
  return (
    <CommentComponent
      comments={comments}
      loaded={loaded}
      loading={loading}
      nullPage={nullPage}
      parent={props.parent}
      counts={counts}
      currentPage={currentPage}
      sortBy={sortBy}
      refreshAfterDeleteComment={refreshAfterDeleteComment}
      setCurrentPage={setCurrentPage}
      setSortBy={setSortBy}
      setRefresh={setRefresh}
      refresh={refresh}
      replyForm={props.replyForm}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total, isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentContainerTemplate);
