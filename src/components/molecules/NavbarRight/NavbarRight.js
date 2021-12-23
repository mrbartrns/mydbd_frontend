import React from "react";
import NavbarWrapper from "../../atoms/NavbarWrapper";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

function NavbarRight({ isLoggedIn, user, dispatch, ...rest }) {
  console.log(isLoggedIn, user);
  return (
    <NavbarWrapper>
      {!isLoggedIn ? (
        <>
          <Nav.Link href="/login">로그인</Nav.Link>
          <Nav.Link href="/signup">회원가입</Nav.Link>
        </>
      ) : (
        <Nav.Link>로그아웃</Nav.Link>
      )}
    </NavbarWrapper>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(NavbarRight);
