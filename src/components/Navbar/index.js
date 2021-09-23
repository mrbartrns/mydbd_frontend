import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { FaPlay, FaBars } from "react-icons/fa";
import "../../css/component/navbar.component.scss";
import { useMediaQuery } from "react-responsive";
import { Container } from "react-bootstrap";

function Navbar(props) {
  const [onToggle, setToggle] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  const handleToggleBtn = (e) => {
    e.preventDefault();
    setToggle(!onToggle);
  };
  useEffect(() => {
    setToggle(false);
  }, [location.pathname]);
  return (
    <nav className="navbar">
      <Container md="true">
        <div className="navbar__logo">
          {/* <img src="https://pin.it/3Eab5Lk" alt="" /> */}
          <Link to="/">
            <FaPlay className="icon" />
            MYDBD
          </Link>
        </div>
        {!isTablet || (isTablet && onToggle) ? (
          <ul className="navbar__menu">
            <li>
              <Link to="/list/killers">Killers</Link>
            </li>
            <li>
              <Link to="/list/survivors">Survivors</Link>
            </li>
            <li>
              <Link to="/list/perks">Perks</Link>
            </li>
            <li>
              <Link to="/list/items">Items</Link>
            </li>
            <li>
              <Link to="/list/addons">Addons</Link>
            </li>
          </ul>
        ) : null}
        {!isTablet || (isTablet && onToggle) ? (
          <ul className="navbar__account">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        ) : null}
      </Container>

      <FaBars className="navbar__toggle" onClick={handleToggleBtn} />
    </nav>
  );
}

export default Navbar;
