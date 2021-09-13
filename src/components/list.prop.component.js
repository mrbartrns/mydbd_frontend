import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/user.service";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import {
  setCurrentPage,
  setStartEndPage,
  setTotalCount,
  setTotalPage,
} from "../actions/pagination";
import Paginator from "./pagination.component";

function ListTemplate(props) {
  const dispatch = props.dispatch;
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(location);
  useEffect(() => {
    setLoading(true);
    const page = parseInt(location.search.split("=")[1]) || 1;
    dispatch(setCurrentPage(page));
    UserService.getApiList("killers", page).then((response) => {
      dispatch(setTotalCount(response.data.count));
      setPosts(response.data.results);
      dispatch(setTotalPage());
      dispatch(setStartEndPage());
    });
    setLoading(false);
  }, [dispatch, location.search, props.currentPage]);
  console.log(props.currentPage);
  console.log(props.count);
  console.log(posts);
  return (
    // TODO: fix key
    <div>
      {!loading &&
        posts.map((data, idx) => {
          return (
            <div key={idx}>
              <div>
                <Link to="#">{data.name}</Link>
                <p>{data.name_kor}</p>
              </div>
            </div>
          );
        })}
      <Paginator url={location.pathname + "?page="} />
    </div>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, count, total } = state.paginationReducer;
  return { currentPage, start, end, count, total };
}

export default connect(mapStateToProps)(ListTemplate);
