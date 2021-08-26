import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/LoginModal.css";
import { connect } from "react-redux";
import { login } from "../actions/auth";

function Login(props) {
  const dispatch = props.dispatch;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, userPassword)).then((res) => {
      history.push("/");
    });
  };
  if (props.isLoggedIn) {
    alert("잘못된 접근입니다.");
    return <Redirect to="/" />;
  }

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
        <Form onSubmit={handleLoginSubmit}>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            placeholder="ID"
            id="id"
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handlePasswordChange}
          />
          <input type="submit" />
          {props.message ? (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {props.message}
              </div>
            </div>
          ) : null}
        </Form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  const { message } = state.messageReducer;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
