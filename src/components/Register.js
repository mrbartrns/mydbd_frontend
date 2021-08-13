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
  //TODO: make error message to object and display on the view
  const handleRegisterSubmit = () => {
    if (password !== passwordConfirm) return;
    axiosInstance
      .post("user/signup", userData)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        history.push("/");
      })
      .catch((error) => {
        console.log(error.stack);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form>
        <UsernameForm
          field={"username"}
          onChangeFunction={handleUsernameChange}
        />
        <PasswordForm
          field={"password"}
          onChangeFunction={handlePasswordChange}
        />
        <PasswordForm
          field={"passwordConfirm"}
          onChangeFunction={handlePasswordConfirmChange}
        />
        <EmailForm field={"email"} onChangeFunction={handleEmailChange} />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
