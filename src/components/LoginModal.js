import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import axiosInstance from "../axiosApi";
import { BEARER, ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../css/LoginModal.css";

function LoginModal(props) {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const userData = { username: username, password: userPassword };
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("user/login", userData)
      .then((json) => json.data)
      .then((data) => {
        axiosInstance.defaults.headers["Authorization"] = BEARER + data.access;
        console.log(axiosInstance.defaults.headers);
        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        history.push("/");
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  };
  const history = useHistory();

  return (
    <Modal.Dialog>
      <Modal.Header
        closeButton
        onClick={() => {
          history.goBack();
        }}
      >
        <Modal.Title>
          <span>로그인</span>
        </Modal.Title>
      </Modal.Header>
      <div>
        <Modal.Body>
          <UsernameForm
            field={"username"}
            onChangeFunction={handleNameChange}
          />
          <PasswordForm
            field={"password"}
            onChangeFunction={handlePasswordChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginSubmit}>
            로그인
          </Button>
          <Link to="/register">아직 가입하지 않으셨나요? 여기를 누르세요.</Link>
        </Modal.Footer>
      </div>
    </Modal.Dialog>
  );
}

function UsernameForm(props) {
  return (
    <Form.Group className="mb-3" controlId={props.field}>
      <FloatingLabel controlId="floatingInput" label="ID" className="mb-3">
        <Form.Control
          type="text"
          placeholder={props.field}
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
      <FloatingLabel controlId={props.field} label={props.field}>
        <Form.Control
          type="password"
          placeholder={props.field}
          required
          onChange={props.onChangeFunction}
        />
      </FloatingLabel>
    </Form.Group>
  );
}

export default LoginModal;
