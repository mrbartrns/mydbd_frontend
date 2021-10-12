// react imports
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";

// custom imports
import userService from "../services/user.service";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
} from "../actions/pagination";

// functions
import { parseQueryStringToDictionary } from "../functions";
import { connect } from "react-redux";
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
    dispatch(setCurrentPage(page));
    setLoaded(false);
    setNullPage(false);
    userService
      .getCommentList(location.pathname, queries)
      .then((response) => {
        // if page has contents -> display comments
        dispatch(setTotalCount(response.data.count));
        dispatch(setTotalPage());
        dispatch(setStartEndPage());
        setComments(response.data.results);
        setLoaded(true);
      })
      .catch((err) => {
        // if page not have contents -> display null page
        setLoaded(true);
        setNullPage(true);
      });
  }, [dispatch, location]);
  console.log(comments);
  return (
    loaded && (
      <CommentComponent
        comments={comments}
        loaded={loaded}
        nullPage={nullPage}
      />
    )
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total };
}

export default connect(mapStateToProps)(CommentTemplate);
