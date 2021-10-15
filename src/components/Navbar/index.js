import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { FaPlay, FaBars } from "react-icons/fa";
import "../../css/component/navbar.component.scss";
import { useMediaQuery } from "react-responsive";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

function Navbar(props) {
  const [onToggle, setToggle] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  const handleToggleBtn = (e) => {
    e.preventDefault();
    setToggle(!onToggle);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setToggle(false);
    }
    return () => {
      mounted = false;
    };
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
              <Link to="/killers/list">Killers</Link>
            </li>
            <li>
              <Link to="/survivors/list">Survivors</Link>
            </li>
            <li>
              <Link to="/perks/list">Perks</Link>
            </li>
            <li>
              <Link to="/items/list">Items</Link>
            </li>
            <li>
              <Link to="/addons/list">Addons</Link>
            </li>
          </ul>
        ) : null}
        {!isTablet || (isTablet && onToggle) ? (
          !props.isLoggedIn ? (
            <ul className="navbar__account">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar__account">
              <li>
                <Link to="#">{props.user.user.username}님</Link>
              </li>
              <li className="navbar__account__logout" onClick={props.logout}>
                Logout
              </li>
            </ul>
          )
        ) : null}
      </Container>

      <FaBars className="navbar__toggle" onClick={handleToggleBtn} />
    </nav>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(Navbar);
