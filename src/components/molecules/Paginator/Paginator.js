import React from "react";
import { Pagination } from "react-bootstrap";
import classNames from "classnames";
import styles from "./Paginator.scss";

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
    <Pagination>
      <Pagination.Prev onClick={onPrev} />
      {items}
      <Pagination.Next onClick={onNext} />
    </Pagination>
  );
}
export default Paginator;
