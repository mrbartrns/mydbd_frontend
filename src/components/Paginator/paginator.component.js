import React from "react";
import {
  getNextOffsetStep,
  getPrevOffsetStep,
  getOffsetCount,
  getTotalPageCount,
} from "../../abstractStructures/paginator";
export default function Paginator({
  currentPage,
  offset,
  count,
  startIndex,
  endIndex,
  onNext,
  onPrev,
  goTo,
  pageSize,
}) {
  const paginationArr = [];
  for (let i = startIndex; i < endIndex; i++) {
    paginationArr.push(i + 1);
  }
  return (
    <div className="paginator">
      <div
        className="page arrow_offset_prev"
        onClick={() => {
          const prevOffsetIndex = getPrevOffsetStep(currentPage, offset);
          goTo(prevOffsetIndex + 1);
        }}
      >
        {"<<"}
      </div>
      <div
        className="page arrow_prev"
        onClick={() => {
          const FIRST_PAGE_MESSAGE = "첫 번째 페이지입니다.";
          if (currentPage <= 1) {
            window.alert(FIRST_PAGE_MESSAGE);
            return;
          }
          onPrev();
        }}
      >
        {"<"}
      </div>
      {paginationArr.map((page, index) => {
        return (
          <div
            className="page index"
            key={index}
            onClick={() => {
              goTo(page);
            }}
          >
            {page}
          </div>
        );
      })}
      <div
        className="page arrow_next"
        onClick={() => {
          const LAST_PAGE_MESSAGE = "마지막 페이지입니다.";
          const offsetCount = getOffsetCount(count);
          const totalPageCount = getTotalPageCount(offsetCount, pageSize);
          if (currentPage >= totalPageCount) {
            window.alert(LAST_PAGE_MESSAGE);
            return;
          }
          onNext();
        }}
      >
        {">"}
      </div>
      <div
        className="page arrow_offset_next"
        onClick={() => {
          const nextOffsetIndex = getNextOffsetStep(
            currentPage,
            pageSize,
            offset,
            count
          );
          goTo(nextOffsetIndex + 1);
        }}
      >
        {">>"}
      </div>
    </div>
  );
}
