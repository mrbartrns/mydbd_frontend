import React, { useState, useEffect } from "react";

// custom imports
import UserService from "../services/user.service";
import { useLocation, useHistory } from "react-router";
import { connect } from "react-redux";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
} from "../actions/pagination";
import ListComponent from "../components/List/index";

// functions
import { parseQueryStringToDictionary } from "../functions";

function ListTemplate(props) {
  // constants
  const dispatch = props.dispatch;
  const location = useLocation();
  const history = useHistory();

  // states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // functions

  // fetch data from api and render
  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    const queries = parseQueryStringToDictionary(location.search);
    console.log(queries);
    const page = parseInt(queries["page"]) || 1;
    dispatch(setCurrentPage(page));
    UserService.getApiList(location.pathname, queries)
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
    setLoaded(true);
  }, [dispatch, history, location, props.currentPage]);

  // return Component
  return <ListComponent loading={loading} posts={posts} loaded={loaded} />;
}

function mapStateToProps(state) {
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total };
}

export default connect(mapStateToProps)(ListTemplate);
