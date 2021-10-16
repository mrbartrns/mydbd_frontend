// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";

// custom imports
import UserService from "../services/user.service";
import DetailComponent from "../components/Detail/detail.component";
import CommentTemplate from "./comment.template";

function DetailTemplate(props) {
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    UserService.getApiDetail(location.pathname).then((response) => {
      setArticle(response.data);
      setLoaded(true);
    });
  }, [location]);
  return (
    <div className="detail__template">
      <DetailComponent post={article} loaded={loaded} />
      <CommentTemplate />
    </div>
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
