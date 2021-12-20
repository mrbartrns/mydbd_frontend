import React from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./PageTemplate.scss";
import Navbar from "../../organisms/Navbar";

const cx = classNames.bind(style);

function PageTemplate({ children }) {
  return (
    <div className={cx("page")}>
      {/* <Navbar /> */}
      <Container md>{children}</Container>
    </div>
  );
}

export default PageTemplate;
