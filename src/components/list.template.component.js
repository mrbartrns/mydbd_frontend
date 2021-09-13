import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// custom components
import UserService from "../services/user.service";
import { useLocation, useHistory } from "react-router";
import { connect } from "react-redux";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
} from "../actions/pagination";
import ListComponent from "./list.component";

function ListTemplate(props) {
  // constants
  const dispatch = props.dispatch;
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  // states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch data from api and render
  useEffect(() => {
    setLoading(true);
    const page = parseInt(location.search.split("=")[1]) || 1;
    dispatch(setCurrentPage(page));
    UserService.getApiList(params.category, page)
      .then((response) => {
        dispatch(setTotalCount(response.data.count));
        setPosts(response.data.results);
        dispatch(setTotalPage());
        dispatch(setStartEndPage());
      })
      .catch((error) => {
        history.push("/my404");
      });
    setLoading(false);
  }, [
    dispatch,
    history,
    location.pathname,
    location.search,
    params.category,
    props.currentPage,
  ]);

  // return Component
  return <ListComponent loading={loading} posts={posts} />;
}

function mapStateToProps(state) {
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total };
}

export default connect(mapStateToProps)(ListTemplate);
