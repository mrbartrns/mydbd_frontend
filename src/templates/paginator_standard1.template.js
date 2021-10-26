import React from "react";

import PaginatorComponent from "../components/Comment/comment_paginator.component";

function Paginator(props) {
  /**
   * pagination component에서 필요한 내용:
   * currentPage -> comment template에서 불러오는 내용
   * setCurrentPage -> comment template에서 불러오는 내용
   * total counts -> comment template에서 불러오는 내용
   * POST_PER_PAGE -> 한 페이지에 몇 개를 표시할 것인지
   * PAGE_OFFSET -> 몇개의 페이지를 한번에 표시할 것인지
   * start_index, end_index -> 페이지네이션 시작과 끝 페이지를 설정하는 변수
   */
  const POST_PER_PAGE = 10;
  const PAGE_OFFSET = 5;
  const { startIndex, endIndex } = setStartAndEndPage(
    props.currentPage,
    props.counts
  );
  const paginationArr = [];
  for (let i = startIndex; i < endIndex; i++) {
    paginationArr.push(i + 1);
  }

  // startIndex 와 endIndex는 props.currentPage를 이용하여 정의한다.
  // useState를 이용하여 5에 도달했을 때 다음 5개를 불러와야 한다.
  // TODO: set next Pagination arr over 5 pages
  function getEndOfTotalPage(totalCounts) {
    return Math.floor(totalCounts / POST_PER_PAGE) + 1;
  }

  function setStartAndEndPage(currentPage, totalCounts) {
    const endOfTotalPage = getEndOfTotalPage(totalCounts);
    const startIndex =
      Math.floor((currentPage - 1) / PAGE_OFFSET) * PAGE_OFFSET;
    const endIndex =
      startIndex + PAGE_OFFSET <= endOfTotalPage
        ? startIndex + PAGE_OFFSET
        : endOfTotalPage;
    return { startIndex, endIndex };
  }

  // display next PAGE_OFFSET arr
  function getNextPages(currentPage) {
    const nextStartIdx =
      Math.floor((currentPage - 1) / PAGE_OFFSET) * PAGE_OFFSET;
    return nextStartIdx + 6;
  }

  // display previous PAGE_OFFSET arr
  function getPreviousPages(currentPage) {
    const previousStartIdx =
      Math.floor((currentPage - 1) / PAGE_OFFSET) * PAGE_OFFSET;
    return previousStartIdx - 4;
  }

  return (
    <PaginatorComponent
      getPreviousPages={getPreviousPages}
      getNextPages={getNextPages}
      getEndOfTotalPage={getEndOfTotalPage}
      setCurrentPage={props.setCurrentPage}
      currentPage={props.currentPage}
      counts={props.counts}
      paginationArr={paginationArr}
    />
  );
}

export default Paginator;
