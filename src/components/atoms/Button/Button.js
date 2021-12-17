import React from "react";
import styles from "./Button.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * className: 추가할 다른 className
 * disabled, invert, flat dark 등등
 * rest: type, onClick 등등
 * children: 들어가야 할 내용들
 */
function Button({
  className,
  children,
  style,
  disabled,
  onClick,
  fullWidth,
  big,
  flex,
  ...rest
}) {
  return (
    <button
      className={cx(
        "button",
        { disabled, flex, "full-width": fullWidth, big },
        className
      )}
      style={{ ...style }}
      {...rest}
      onClick={disabled ? null : onClick}
    >
      {children}
    </button>
  );
}

export default Button;
