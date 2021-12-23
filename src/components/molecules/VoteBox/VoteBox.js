import React from "react";
import classNames from "classnames";
import styles from "./VoteBox.scss";
import Box from "../../atoms/Box/Box";

const cx = classNames.bind(styles);

function VoteBox({ children, voted, style, onClick, ...rest }) {
  return (
    <Box
      className={cx("vote-box", { voted })}
      style={style}
      onClick={onClick ? onClick : null}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default VoteBox;
