import React from "react";
import { Pagination } from "react-bootstrap";
import classNames from "classnames";
import styles from "./Paginator.scss";
import {
  getOffsetCount,
  getTotalPageCount,
} from "../../../abstract_structures/paginator";

const cx = classNames.bind(styles);

function Paginator({
  currentPage,
  offset,
  count,
  startIndex,
  endIndex,
  onNext,
  onPrev,
  goTo,
  pageSize,
  className,
}) {
  const items = [];
  for (let index = startIndex; index < endIndex; index++) {
    items.push(
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => goTo(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className={cx(className)}>
      <Pagination.Prev
        onClick={() => {
          const FIRST_PAGE_MESSAGE = "첫 번째 페이지입니다.";
          if (currentPage <= 1) {
            window.alert(FIRST_PAGE_MESSAGE);
            return;
          }
          onPrev();
        }}
      />
      {items}
      <Pagination.Next
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
      />
    </Pagination>
  );
}
export default Paginator;
