import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbar.component";
function Navbar() {
  return (
    <Nav>
      <NavLink to="/">
        <h1>Logo</h1>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/about" activeStyle>
          About
        </NavLink>
        <NavLink to="/services" activeStyle>
          Services
        </NavLink>
        <NavLink to="/contact-us" activeStyle>
          Contact us
        </NavLink>
        <NavLink to="/sign-up" activeStyle>
          About
        </NavLink>
      </NavMenu>
    </Nav>
  );
}

export default Navbar;
