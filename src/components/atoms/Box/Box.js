import React from "react";
import classNames from "classnames";
import styles from "./Box.scss";

const cx = classNames.bind(styles);

function Box({ border, style, children, ...rest }) {
  return (
    <div
      className={cx("box", { border })}
      {...rest}
      style={style ? style : null}
    >
      {children}
    </div>
  );
}

export default Box;
