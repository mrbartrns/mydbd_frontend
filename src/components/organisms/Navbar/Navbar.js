import React from "react";
import {
  Navbar as BNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./Navbar.scss";

const cx = classNames.bind(style);

function Navbar({ className, ...rest }) {
  <BNavbar bg="light" expand="lg" className={cx("navbar", className)} {...rest}>
    <Container>
      <Navbar.Brand href="#home">MYDBD</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="살펴보기" id="basic-nav-dropdown">
            <NavDropdown.Item href="/killers/list">Killers</NavDropdown.Item>
            <NavDropdown.Item href="/surviors/list">Survivors</NavDropdown.Item>
            <NavDropdown.Item href="/perks/list">Perks</NavDropdown.Item>
            <NavDropdown.Item href="/items/list">Items</NavDropdown.Item>
            <NavDropdown.Item href="/addons/list">Addons</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav.Link href="/forum">Forum</Nav.Link>
      </Navbar.Collapse>
    </Container>
  </BNavbar>;
}
export default Navbar;
