import React from "react";
import NavbarWrapper from "../../atoms/NavbarWrapper";
import { Nav } from "react-bootstrap";

function NavbarRight({ isLoggedIn, user, onLogout, ...rest }) {
  return (
    <NavbarWrapper>
      {!isLoggedIn ? (
        <>
          <Nav.Link href="/login">로그인</Nav.Link>
          <Nav.Link href="/signup">회원가입</Nav.Link>
        </>
      ) : (
        <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>
      )}
    </NavbarWrapper>
  );
}

export default NavbarRight;
