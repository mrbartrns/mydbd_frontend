import React from "react";
import classNames from "classnames";
import styles from "./Textarea.scss";

const cx = classNames.bind(styles);

function Textarea({ className, style, autoSize, ...rest }) {
  return (
    <textarea
      className={cx("text-area", { "auto-size": autoSize }, className)}
      style={style}
      {...rest}
    />
  );
}

export default Textarea;
