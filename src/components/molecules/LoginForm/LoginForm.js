import React from "react";
import { Form, Alert } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./LoginForm.scss";
import InputWrapper from "../../atoms/InputWrapper";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const cx = classNames.bind(styles);

function LoginForm({
  username,
  password,
  error,
  className,
  onSubmit,
  ...rest
}) {
  const ERROR_MESSAGE = "아이디 또는 비밀번호를 확인해주세요.";
  return (
    <Form
      className={cx("login-form", {}, className)}
      onSubmit={onSubmit ? onSubmit : null}
      {...rest}
    >
      <InputWrapper border padding borderTopLeftRadius borderTopRightRadius>
        <Input type="text" borderNone fullWidth placeHolder="아이디" />
      </InputWrapper>
      <InputWrapper
        border
        padding
        borderBottomLeftRadius
        borderBottomRightRadius
      >
        <Input type="password" borderNone fullWidth placeHolder="비밀번호" />
      </InputWrapper>
      {error && <Alert variant="danger">{ERROR_MESSAGE}</Alert>}
      <Button fullWidth big>
        로그인
      </Button>
    </Form>
  );
}

export default LoginForm;
