import React from "react";
import { NavbarWrapper } from "../../atoms/NavbarWrapper";
import { Nav } from "react-bootstrap";

function NavbarRight() {
  return (
    <NavbarWrapper>
      <Nav.Link href="/login">로그인</Nav.Link>
      <Nav.Link href="/signup">회원가입</Nav.Link>
    </NavbarWrapper>
  );
}

export default NavbarRight;
