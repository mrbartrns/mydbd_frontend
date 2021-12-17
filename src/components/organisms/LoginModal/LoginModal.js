import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./LoginModal.scss";
import LoginForm from "../../molecules/LoginForm";

const cx = classNames.bind(style);

function LoginModal({ username, password, error, onSubmit, className }) {
  return (
    <Modal.Dialog className={cx("login-modal", {}, className)}>
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
      <Modal.Footer className={cx("login-modal-footer")}>
        <Link to="/signup">아직 회원가입을 하지 않았다면, 가입하러 가기</Link>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default LoginModal;
