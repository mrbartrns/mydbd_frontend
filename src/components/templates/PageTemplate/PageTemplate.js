import React from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./PageTemplate.scss";
import NavbarContainer from "../../../containers/NavbarConatiner/NavbarContainer";
import AuthVerify from "../../../common/auth-verify";

const cx = classNames.bind(style);

function PageTemplate({ children }) {
  return (
    <div className={cx("page")}>
      {/* <AuthVerify /> */}
      <NavbarContainer />
      <Container>{children}</Container>
    </div>
  );
}

export default PageTemplate;
