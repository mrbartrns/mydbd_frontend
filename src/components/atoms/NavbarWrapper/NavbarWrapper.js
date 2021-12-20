import React from "react";
import classNames from "classnames/bind";
import style from "./NavbarWrapper.scss";

const cx = classNames.bind(style);

function NavbarWrapper({ children, ...rest }) {
  return (
    <div className={cx("navbar-wrapper")} {...rest}>
      {children}
    </div>
  );
}

export default NavbarWrapper;
