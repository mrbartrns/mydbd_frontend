// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";

// custom imports
import UserService from "../services/user.service";

// functions
import { parseQueryStringToDictionary } from "../functions";
import CommentComponent from "../components/Comment/comment.component";

/**
 * CommentTemplate는 parent comment를 api로부터 불러온다.
 * 댓글은 처음 10개를 불러온 뒤, nextPage가 변화함에 따라 댓글을 불러온다.
 * 만약 댓글의 정렬 순서가 바뀌었을 경우, 처음부터 다시 로드(댓글 다시 채우기)
 */
function CommentTemplate(props) {
  // constants
  const location = useLocation();

  // states
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [nullPage, setNullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [counts, setCounts] = useState(null); // store total comment counts

  // functions

  function handleDeleteComment(commentId) {
    // comment delete function without refreshing current page
    // USE JAVASCRIPT Array.filter FUNCTION WHEN REMOVE ELEMENT
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  // useEffect
  useEffect(() => {
    const source = UserService.getCancelToken();

    // set query to get comments
    const queries = parseQueryStringToDictionary(location.search);
    queries["parent"] = props.parent || null;
    queries["page"] = parseInt(queries["page"]) || 1;
    queries["sortby"] = queries["sortby"] || "recent";
    queries["cancelToken"] = source.token;
    let mounted = true;
    if (mounted) {
      const page = queries["page"];
      const sort = queries["sortby"];
      setCurrentPage(page);
      setSortBy(sort);
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
  }, [location, props.parent]);
  return (
    <CommentComponent
      comments={comments}
      loaded={loaded}
      loading={loading}
      nullPage={nullPage}
      parent={props.parent}
      counts={counts}
      handleDeleteComment={handleDeleteComment}
      currentPage={currentPage}
      sortBy={sortBy}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total, isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentTemplate);
