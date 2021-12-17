import React from "react";
import { Modal } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./LoginModal.scss";
import LoginForm from "../../molecules/LoginForm";

const cx = classNames.bind(style);

function LoginModal({
  username,
  password,
  error,
  onSubmit,
  className,
  ...rest
}) {
  return (
    <Modal.Dialog className={cx("login-modal", {}, className)} {...rest}>
      <Modal.Header>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm
          username={username}
          password={password}
          error={error}
          onSubmit={onSubmit}
        />
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default LoginModal;
