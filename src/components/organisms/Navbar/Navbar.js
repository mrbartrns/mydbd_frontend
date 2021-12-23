import React from "react";
import { Navbar as BNavbar, Container } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Navbar.scss";
import NavbarLeft from "../../molecules/NavbarLeft";
import NavbarRight from "../../molecules/NavbarRight";

const cx = classNames.bind(style);

function Navbar({ className, isLoggedIn, onLogout, user, ...rest }) {
  return (
    <BNavbar
      bg="light"
      expand="lg"
      className={cx("navbar", className)}
      {...rest}
    >
      <Container>
        <NavbarLeft />
        <NavbarRight isLoggedIn={isLoggedIn} onLogout={onLogout} user={user} />
      </Container>
    </BNavbar>
  );
}
export default Navbar;
