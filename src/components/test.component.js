import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserService from "../services/user.service";
import Paginator from "./pagination.component";
import { updatePaginator } from "../actions/pagination";

function Test(props) {
  const dispatch = props.dispatch;
  useEffect(() => {
    UserService.getTestApiList().then((response) => {
      dispatch(updatePaginator(5, 500));
    });
  });
  return (
    <div>
      <Paginator></Paginator>
    </div>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, total, count } = state.paginationReducer;
  return { currentPage, start, end, total, count };
}

export default connect(mapStateToProps)(Test);
