import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./RegisterModal.scss";
import RegisterForm from "../../molecules/RegisterForm/RegisterForm";

const cx = classNames.bind(style);

function RegisterModal({
  username,
  password,
  passwordConfirm,
  email,
  onChangeUsername,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeEmail,
  onSubmit,
  className,
  ...rest
}) {
  return (
    <Modal.Dialog className={cx("register-modal", {}, className)} {...rest}>
      <Modal.Header>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm
          username={username}
          password={password}
          passwordConfirm={passwordConfirm}
          email={email}
          onChangeUsername={onChangeUsername}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onChangeEmail={onChangeEmail}
          onSubmit={onSubmit}
        />
      </Modal.Body>
      <Modal.Footer className={cx("register-modal-footer")}>
        <Link to="/login">이미 회원이라면, 로그인하기</Link>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default RegisterModal;
