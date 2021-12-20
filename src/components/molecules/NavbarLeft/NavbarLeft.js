import React from "react";
import NavbarWrapper from "../../atoms/NavbarWrapper";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavbarLeft() {
  return (
    <NavbarWrapper>
      <Navbar.Brand href="/">MYDBD</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
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
    </NavbarWrapper>
  );
}
export default NavbarLeft;
