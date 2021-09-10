import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Paginator(props) {
  const paginationArr = [];
  for (let i = props.start; i < props.end; i++) {
    paginationArr.push(i + 1);
  }
  console.log(paginationArr);
  return (
    <nav>
      <ul>
        {paginationArr &&
          paginationArr.map((data, idx) => {
            return (
              <li>
                <Link to={`${props.pathname}${props.search}${data}`}>
                  {data}
                </Link>
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
