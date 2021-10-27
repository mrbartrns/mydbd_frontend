import React from "react";

import "../../css/component/pagination.component.scss";

function PaginatorComponent(props) {
  return (
    <div className="pagination_container">
      <ul className="paginator">
        {props.getPreviousPages(props.currentPage) >= 0 && (
          <li
            className="previous"
            onClick={() => {
              props.setCurrentPage(props.getPreviousPages(props.currentPage));
            }}
          >
            이전
          </li>
        )}
        {props.paginationArr.map((pageNumber) => {
          return (
            <li
              className={`paginator__page ${
                props.currentPage === pageNumber ? "current" : null
              }`}
              key={pageNumber}
              onClick={() => {
                props.setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
        {props.getNextPages(props.currentPage) <=
          props.getEndOfTotalPage(props.counts) && (
          <li
            className="next"
            onClick={() => {
              props.setCurrentPage(props.getNextPages(props.currentPage));
            }}
          >
            다음
          </li>
        )}
      </ul>
    </div>
  );
}

export default PaginatorComponent;
