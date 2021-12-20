import React from "react";
import classNames from "classnames/bind";
import style from "./RegisterTemplate";
import PageTemplate from "../PageTemplate";

const cx = classNames.bind(style);

function RegisterTemplate({ children }) {
  return <div className={cx("register-template")}>{children}</div>;
}

export default RegisterTemplate;
