import React from "react";
import style from "./LoginTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LoginTemplate({ children }) {
  return <div className={cx("login-template")}>{children}</div>;
}

export default LoginTemplate;
