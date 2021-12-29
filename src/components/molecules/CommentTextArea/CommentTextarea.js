import React from "react";
import classNames from "classnames";
import styles from "./CommentTextarea.scss";
import FlexBox from "../../atoms/FlexBox";
import Button from "../../atoms/Button";
import { FormControl } from "react-bootstrap";

const cx = classNames.bind(styles);

function CommentForm({ className, style, required, onChange, ...rest }) {
  return (
    <FlexBox className={"comment-flex-box"} {...rest}>
      <FormControl
        required
        as="textarea"
        className={cx("comment-text-area")}
        onChange={onChange ? onChange : null}
      />
      <Button
        variant="light"
        type="submit"
        className={cx("comment-submit-btn")}
      >
        제출
      </Button>
    </FlexBox>
  );
}

export default CommentForm;
