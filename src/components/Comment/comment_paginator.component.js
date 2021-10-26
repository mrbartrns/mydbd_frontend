import React from "react";

function PaginatorComponent(props) {
  return (
    <ul>
      {props.getPreviousPages(props.currentPage) >= 0 && (
        <li
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
            key={pageNumber}
            style={{ cursor: "pointer", textDecoration: "underline" }}
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
          onClick={() => {
            props.setCurrentPage(props.getNextPages(props.currentPage));
          }}
        >
          다음
        </li>
      )}
    </ul>
  );
}

export default PaginatorComponent;
