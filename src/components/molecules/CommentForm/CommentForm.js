import React from "react";
import classNames from "classnames";
import styles from "./CommentForm.scss";
import { Form, FormControl } from "react-bootstrap";

const cx = classNames.bind(styles);

function CommentForm({ children, className, style, onSubmit, ...rest }) {
  return (
    <Form
      className={cx("comment-form", className)}
      {...rest}
      style={style}
      onSubmit={onSubmit ? onSubmit : null}
    >
      {children}
      <FormControl as="textarea" />
    </Form>
  );
}

export default CommentForm;
