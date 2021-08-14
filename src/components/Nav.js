import React from "react";
import { Navbar, NavDropdown, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const navbarStyle = {
  display: "flex",
};

function NavbarWrapper(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{ alignItems: "center", textAlign: "center" }}>
        <Navbar.Brand href="/">MYDBD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div style={navbarStyle}>
              <Link to="/killers" className="nav-link">
                Killers
              </Link>
              <Link to="/survivors" className="nav-link">
                Survivors
              </Link>
              <Link to="/perks" className="nav-link">
                Perks
              </Link>
              <Link to="/items" className="nav-link">
                Items
              </Link>
              <Link to="/addons" className="nav-link">
                Addons
              </Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div style={{ float: "right" }}>
              <Button variant="link">
                <Link to="/login">로그인/회원가입</Link>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWrapper;
