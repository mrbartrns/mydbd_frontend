import React from "react";
import {
  Navbar as BNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Navbar.scss";
import NavbarLeft from "../../molecules/NavbarLeft";
import NavbarRight from "../../molecules/NavbarRight";

const cx = classNames.bind(style);

function Navbar({ className, ...rest }) {
  <BNavbar bg="light" expand="lg" className={cx("navbar", className)} {...rest}>
    <Container>
      <NavbarLeft />
      <NavbarRight />
    </Container>
  </BNavbar>;
}
export default Navbar;
