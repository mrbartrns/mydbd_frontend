import classNames from "classnames";
import React from "react";
import styles from "./ErrorPageTemplate.scss";

const cx = classNames.bind(styles);

function ErrorPageTemplate({ children }) {
  return <div className={cx("error-page-template")}>{children}</div>;
}

export default ErrorPageTemplate;
