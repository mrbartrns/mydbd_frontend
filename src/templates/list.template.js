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
import ListComponent from "../components/List/index";

function ListTemplate(props) {
  // constants
  const dispatch = props.dispatch;
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  // states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // functions
  // get parameter objects
  const getRequestParams = (page) => {
    const parameters = {};
    if (page) {
      parameters["page"] = page;
    }
    return parameters;
  };

  // fetch data from api and render
  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    //TODO: change location.search object to get flexible
    const page = parseInt(location.search.split("=")[1]) || 1;
    const parameters = getRequestParams(page);
    dispatch(setCurrentPage(page));
    UserService.getApiList(params.category, parameters)
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
  }, [
    dispatch,
    history,
    location.pathname,
    location.search,
    params.category,
    props.currentPage,
  ]);

  // return Component
  return <ListComponent loading={loading} posts={posts} loaded={loaded} />;
}

function mapStateToProps(state) {
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total };
}

export default connect(mapStateToProps)(ListTemplate);
