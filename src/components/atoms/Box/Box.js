import React from "react";
import classNames from "classnames";
import styles from "./Box.scss";

const cx = classNames.bind(styles);

function Box({ border, fullWidth, style, children, className, ...rest }) {
  return (
    <div
      className={cx("box", { border, "full-width": fullWidth }, className)}
      {...rest}
      style={style ? style : null}
    >
      {children}
    </div>
  );
}

export default Box;
