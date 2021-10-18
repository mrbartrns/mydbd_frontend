// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";

// custom imports
import UserService from "../services/user.service";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
} from "../actions/pagination";

// functions
import { parseQueryStringToDictionary } from "../functions";
import CommentComponent from "../components/comment.component";

/**
 * CommentTemplate는 parent comment를 api로부터 불러온다.
 */
function CommentTemplate(props) {
  // constants
  const dispatch = props.dispatch;
  const location = useLocation();

  // states
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [nullPage, setNullPage] = useState(false);
  const [content, setContent] = useState("");

  // functions
  function handlePostComment(data) {
    if (!props.isLoggedIn) {
      console.log("로그인 해야 작성할 수 있습니다.");
      return;
    }
    UserService.postComment(location.pathname, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleContentChange(e) {
    e.preventDefault();
    setContent(e.target.value);
  }

  // useEffect
  useEffect(() => {
    /**
     * 1. currentPage 설정
     * 2. totalCount 설정
     * 3. totalPage 설정
     * 4. startPage, endPage 설정
     * 5. Comment Component로 연결
     */
    const queries = parseQueryStringToDictionary(location.search);
    const page = parseInt(queries["page"]) || 1;
    const source = UserService.getCancelToken();
    queries["cancelToken"] = source.token;

    setLoaded(false);
    setNullPage(false);

    // dispatch
    dispatch(setCurrentPage(page));

    UserService.getCommentList(location.pathname, queries)
      .then((response) => {
        // if page has contents -> display comments
        dispatch(setTotalCount(response.data.count));
        dispatch(setTotalPage());
        dispatch(setStartEndPage());
        setComments(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        // if page not have contents -> display null page
        if (!UserService.isCancel(error)) {
          console.error(error);
        }
        setLoaded(true);
        setNullPage(true);
      });

    return () => {
      UserService.unsubscribe();
    };
  }, [dispatch, location]);

  return (
    loaded && (
      <CommentComponent
        comments={comments}
        loaded={loaded}
        nullPage={nullPage}
        submitComment={handlePostComment}
        handleContentChange={handleContentChange}
        content={content}
      />
    )
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total, isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentTemplate);
