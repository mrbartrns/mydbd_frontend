import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/user.service";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { updatePaginator, setCurrentPage } from "../actions/pagination";
import Paginator from "./pagination.component";

function List(props) {
  const dispatch = props.dispatch;
  const [apiData, setApiData] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [changed, setChange] = useState(false);
  const params = useParams();
  const history = useHistory();
  const queryString = props.location.search.split("=")[0]
    ? props.location.search.split("=")[0] + "="
    : "?page=";

  const currentCategory = params.category;
  const leftBtnClick = (data) => {
    setImgIdx(imgIdx > 0 ? imgIdx - 1 : 0);
  };
  const rightBtnClick = (data) => {
    setImgIdx(imgIdx + 1 <= data.length ? imgIdx + 1 : imgIdx);
  };

  // refresh when query string change or page number change
  // useEffect(() => {
  //   UserService.getApiList(currentCategory, props.currentPage)
  //     .then((response) => {
  //       dispatch(updatePaginator(props.currentPage, response.data.count));

  //       setApiData(response.data.results);
  //     })
  //     .catch((error) => {
  //       history.push("/my404");
  //     });
  // }, []);

  return (
    <div>
      {/* display fetched data using && operator */}
      {apiData &&
        apiData.map((data, idx) => {
          return (
            <div key={idx}>
              <img
                className="api-profile-img"
                src={data.images[imgIdx] ? data.images[imgIdx].image : ""}
                alt=""
              />
              {/* TODO: change url to generic */}
              <Link to={"/detail/killer/" + String(data.id)}>
                <h2>{data.name_kor}</h2>
              </Link>
              <h3>{data.name}</h3>
              {data.images.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    leftBtnClick(data.images);
                  }}
                >
                  prev
                </button>
              )}
              {data.images.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    rightBtnClick(data.images);
                  }}
                >
                  next
                </button>
              )}
            </div>
          );
        })}
      <Paginator pathname={props.location.pathname} search={queryString} />
    </div>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, total, count } = state.paginationReducer;
  return { currentPage, start, end, total, count };
}

export default connect(mapStateToProps)(List);
