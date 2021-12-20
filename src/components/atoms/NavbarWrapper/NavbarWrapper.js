import React from "react";
import classNames from "classnames/bind";
import style from "./NavbarWrapper.scss";

const cx = classNames.bind(style);

function NavbarWrapper({ chilren, ...rest }) {
  return (
    <div classNmae={cx("navbar-wrapper")} {...rest}>
      {chilren}
    </div>
  );
}

export default NavbarWrapper;
