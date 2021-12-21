import React from "react";
import classNames from "classnames/bind";
import style from "./RegisterTemplate";

const cx = classNames.bind(style);

function RegisterTemplate({ children }) {
  return <div className={cx("register-template")}>{children}</div>;
}

export default RegisterTemplate;
