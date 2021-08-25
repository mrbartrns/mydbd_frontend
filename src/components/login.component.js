import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { UsernameForm, PasswordForm } from "./form.component";
import "../css/LoginModal.css";

function LoginModal(props) {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const userData = { username: username, password: userPassword };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.login(userData);
  };

  return (
    <div>
      <h3 style={{ float: "left" }}>로그인</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form onSubmit={handleLoginSubmit} style={{ width: "50vh" }}>
          <UsernameForm
            field={"username"}
            onChangeFunction={handleUsernameChange}
            errors={[]}
          />
          <PasswordForm
            field={"password"}
            onChangeFunction={handlePasswordChange}
            errors={[]}
          />
          {props.error ? <div className="error">{props.error}</div> : null}
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/signup" style={{ display: "block" }}>
            아직 가입하시지 않으셨다면 여기를 누르세요.
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default LoginModal;
