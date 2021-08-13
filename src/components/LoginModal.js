import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axiosInstance from "../axiosApi";
import { BEARER, ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { UsernameForm, PasswordForm } from "./Form";
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
            errors={[]}
          />
          <PasswordForm
            field={"password"}
            onChangeFunction={handlePasswordChange}
            errors={[]}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginSubmit}>
            로그인
          </Button>
          <Link to="/signup">아직 가입하지 않으셨나요? 여기를 누르세요.</Link>
        </Modal.Footer>
      </div>
    </Modal.Dialog>
  );
}

export default LoginModal;
