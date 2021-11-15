import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentPage } from "../actions/pagination";

function Paginator(props) {
  const paginationArr = [];
  const dispatch = props.dispatch;
  for (let i = props.start; i < props.end; i++) {
    paginationArr.push(i + 1);
  }
  return (
    <nav>
      <ul>
        {paginationArr &&
          paginationArr.map((data, idx) => {
            return (
              <li
                className={props.currentPage === data ? "current-page" : null}
                onClick={() => {
                  dispatch(setCurrentPage(data));
                }}
                key={idx}
              >
                <Link to={`${props.url}${data}`}>{data}</Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, total } = state.paginationReducer;
  return { currentPage, start, end, total };
}

export default connect(mapStateToProps)(Paginator);
