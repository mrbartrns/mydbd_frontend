import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import Paginator from "./pagination.component";

function ListComponent(props) {
  const location = useLocation();
  return (
    <div>
      <ul>
        {!props.loading &&
          props.posts.map((data, idx) => {
            return (
              <li key={idx}>
                <Link to="#">{data.name}</Link>
                <p>{data.name_kor}</p>
              </li>
            );
          })}
      </ul>
      {props.posts.length > 0 && (
        <Paginator url={location.pathname + "?page="} />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, total, count } = state.paginationReducer;
  return { currentPage, start, end, total, count };
}

export default connect(mapStateToProps)(ListComponent);
