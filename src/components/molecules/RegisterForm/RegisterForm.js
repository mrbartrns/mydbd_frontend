import React from "react";
import { Form, Alert } from "react-bootstrap";
import style from "./RegisterForm.scss";
import classNames from "classnames/bind";
import InputWrapper from "../../atoms/InputWrapper";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const cx = classNames.bind(style);

function RegisterForm({
  username,
  password,
  email,
  error,
  className,
  onChangeUsername,
  onChangePassword,
  onChangeEmail,
  onSubmit,
  ...rest
}) {
  return (
    <Form
      className={cx("register-form", className)}
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
      <InputWrapper border>
        <Input
          type="email"
          borderNone
          fullWidth
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
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
      {error && <Alert variant="danger">{error}</Alert>}
      <Button fullwidth big type="submit">
        회원가입
      </Button>
    </Form>
  );
}

export default RegisterForm;
