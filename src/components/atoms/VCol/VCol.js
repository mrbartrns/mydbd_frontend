import React from "react";
import classNames from "classnames/bind";
import style from "./VCol.scss";

const cx = classNames.bind(style);

function VCol({ className, head, children, ...rest }) {
  return (
    <div className={cx("vcol", { head }, className)} {...rest}>
      {children}
    </div>
  );
}

export default VCol;
