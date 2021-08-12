import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axiosInstance from "../axiosApi";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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

function UsernameForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel controlId="floatingInput" label="ID" className="mb-3">
        <Form.Control
          type="text"
          placeholder={capitalize(props.field)}
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
      <Form.Text className="text-muted">이 항목은 필수 항목입니다.</Form.Text>
    </Form.Group>
  );
}

function PasswordForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel controlId={props.field} label={capitalize(props.field)}>
        <Form.Control
          type="password"
          placeholder={capitalize(props.field)}
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
    </Form.Group>
  );
}

function EmailForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel
        controlId="registrationEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
}

export default Register;
