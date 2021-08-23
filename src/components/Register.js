import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "../axiosApi";

import { UsernameForm, PasswordForm, EmailForm } from "./Form";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const userData = { username: username, password: password, email: email };
  const history = useHistory();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      const passwordConfirmError = {
        passwordConfirm: ["비밀번호가 다릅니다."],
      };
      setErrors(passwordConfirmError);
      console.log(errors);
      console.error("password and passwordConfirm are not same.");
      return;
    }
    try {
      const response = await axiosInstance.post("user/signup", userData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
      console.log(errors);
    }
  };

  return (
    <div>
      <h3 style={{ float: "left" }}>회원가입</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form onSubmit={handleRegisterSubmit}>
          <UsernameForm
            field={"username"}
            onChangeFunction={handleUsernameChange}
            errors={errors["username"] ? errors["username"] : []}
          />
          <PasswordForm
            field={"password"}
            onChangeFunction={handlePasswordChange}
            errors={errors["password"] ? errors["password"] : []}
          />
          <PasswordForm
            field={"passwordConfirm"}
            onChangeFunction={handlePasswordConfirmChange}
            errors={errors["passwordConfirm"] ? errors["passwordConfirm"] : []}
          />
          <EmailForm
            field={"email"}
            onChangeFunction={handleEmailChange}
            errors={errors["email"] ? errors["email"] : []}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
