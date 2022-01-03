import React from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./PageTemplate.scss";
import NavbarContainer from "../../../containers/NavbarConatiner/NavbarContainer";
import Footer from "../../molecules/Footer";

const cx = classNames.bind(style);

function PageTemplate({ children }) {
  return (
    <div className={cx("page")}>
      <NavbarContainer />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}

export default PageTemplate;
