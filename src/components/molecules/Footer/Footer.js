import React from "react";
import classNames from "classnames";
import styles from "./Footer.scss";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <Container className="footer">
      <p className={cx("footer-title")}>Footer</p>
      <p>
        <Link to="https://github.com/mrbartrns/mydbd_frontend">
          프론트엔드 깃허브
        </Link>
      </p>
      <p>
        <Link to="https://github.com/mrbartrns/mydbd_backend">
          백엔드 깃허브
        </Link>
      </p>
      <p>made by 준혁</p>
    </Container>
  );
}

export default Footer;
