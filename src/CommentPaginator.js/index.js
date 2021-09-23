// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import { setCurrentPage } from "../actions/pagination";

function CommentPaginator(props) {
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
                style={{ cursor: "pointer", color: "blue" }}
                className={props.currentPage === data ? "current-page" : null}
                onClick={() => {
                  dispatch(setCurrentPage(data));
                }}
                key={idx}
              >
                {data}
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

export default connect(mapStateToProps)(CommentPaginator);
