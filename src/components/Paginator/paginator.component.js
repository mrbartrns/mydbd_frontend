import React from "react";
import {
  getNextOffsetStep,
  getPrevOffsetStep,
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
  console.log(paginationArr);
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
