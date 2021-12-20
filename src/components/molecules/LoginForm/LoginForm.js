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
  onChangeUsername,
  onChangePassword,
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
      <InputWrapper border borderTopLeftRadius borderTopRightRadius>
        <Input
          type="text"
          borderNone
          fullWidth
          placeholder="아이디"
          value={username}
          onChange={onChangeUsername}
        />
      </InputWrapper>
      <InputWrapper border borderBottomLeftRadius borderBottomRightRadius>
        <Input
          type="password"
          borderNone
          fullWidth
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      {error && <Alert variant="danger">{ERROR_MESSAGE}</Alert>}
      <Button fullWidth big>
        로그인
      </Button>
    </Form>
  );
}

export default LoginForm;
