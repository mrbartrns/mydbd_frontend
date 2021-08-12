import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axiosInstance from "../axiosApi";

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
        <Form.Group className="mb-3" controlId="username">
          <FloatingLabel controlId="floatingInput" label="ID" className="mb-3">
            <Form.Control
              type="text"
              placeholder="username"
              required
              onChange={handleUsernameChange}
            />
          </FloatingLabel>
          <Form.Text className="text-muted">
            이 항목은 필수 항목입니다.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password1">
          <FloatingLabel controlId="password1" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordConfirm">
          <FloatingLabel controlId="passwordConfirm" label="Password Confirm">
            <Form.Control
              type="password"
              placeholder="Password Confirm"
              required
              onChange={handlePasswordConfirmChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <FloatingLabel
            controlId="registrationEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              onChange={handleEmailChange}
            />
          </FloatingLabel>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
