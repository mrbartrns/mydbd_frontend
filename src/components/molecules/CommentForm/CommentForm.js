import React from "react";
import { Form } from "react-bootstrap";
import classNames from "classnames";
import styles from "./CommentForm.scss";
import CommentTextArea from "../../molecules/CommentTextArea";

const cx = classNames.bind(styles);

function CommentForm({
  onSubmit,
  onChange,
  className,
  comment,
  children,
  ...rest
}) {
  return (
    <Form
      className={cx("forum-comment-form", className)}
      onSubmit={
        onSubmit
          ? (e) => {
              e.preventDefault();
              onSubmit();
            }
          : null
      }
      {...rest}
    >
      {children}
      <CommentTextArea
        required
        onChange={onChange ? (e) => onChange(e, comment.parent) : null}
      />
    </Form>
  );
}

export default CommentForm;
