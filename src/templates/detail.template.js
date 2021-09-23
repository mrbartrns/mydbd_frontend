// react imports
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { connect } from "react-redux";

// custom imports
import UserService from "../services/user.service";
import DetailComponent from "../components/detail.component";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
  updateSliceEndIndex,
  updateSliceStartIndex,
} from "../actions/pagination";

function DetailTemplate(props) {
  //constants
  const dispatch = props.dispatch;
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  //functions
  // function getComments(temp) {
  //   if (!loaded) {
  //     return [];
  //   }
  //   setCommentPagination();
  //   function setCommentPagination() {
  //     dispatch(setTotalPage());
  //     dispatch(setStartEndPage());
  //     dispatch(updateSliceStartIndex());
  //     dispatch(updateSliceEndIndex());
  //   }
  //   const comments = temp.slice(props.sliceStartIndex, props.sliceEndIndex);
  //   return comments;
  // }

  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    // const page = parseInt(location.search.split("=")[1]) || 1;
    // dispatch(setCurrentPage(page));
    UserService.getApiDetail(location.pathname)
      .then((response) => {
        // TODO: make idx pagination
        // here goes comment paginator
        // ordering by -dt_created
        dispatch(setTotalCount(response.data.comments.length));
        setPost(response.data);
        console.log(response.data);
        setCommentPagination();
        function setCommentPagination() {
          dispatch(setTotalPage());
          dispatch(setStartEndPage());
          dispatch(updateSliceStartIndex());
          dispatch(updateSliceEndIndex());
        }
        setComments(
          response.data.comments.slice(
            props.sliceStartIndex,
            props.sliceEndIndex
          )
        );
      })
      .catch((error) => {
        history.push("/my404");
      });
    setLoading(false);
    setLoaded(true);
  }, [
    dispatch,
    history,
    location.pathname,
    location.search,
    props.currentPage,
    props.sliceEndIndex,
    props.sliceStartIndex,
  ]);
  // killer, survivor, addon등에 따라 세부 내용들이 다르므로 다르게 처리해야 한다.
  // template에서는 정보만 넘겨준다.
  return (
    <DetailComponent
      loading={loading}
      loaded={loaded}
      post={post}
      comments={comments}
    />
  );
}

function mapStateToProps(state) {
  const {
    currentPage,
    start,
    end,
    count,
    total,
    sliceStartIndex,
    sliceEndIndex,
  } = state.paginationReducer;
  return {
    currentPage,
    start,
    end,
    count,
    total,
    sliceStartIndex,
    sliceEndIndex,
  };
}

export default connect(mapStateToProps)(DetailTemplate);
// export default DetailTemplate;
