import React from "react";
import { connect } from "react-redux";

// 단순히 props와 useState를 이용한 pagination으로 구현하기
function Paginator(props) {
  const paginationArr = [];
  for (let i = props.start; i < props.end; i++) {
    paginationArr.push(i + 1);
  }
  console.log(paginationArr);
  return <div></div>;
}

function mapStateToProps(state) {
  const { currentPage, start, end, total } = state.paginationReducer;
  return { currentPage, start, end, total };
}

export default connect(mapStateToProps)(Paginator);
