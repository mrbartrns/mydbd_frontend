import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setMessage } from "../actions/message";
import { register } from "../actions/auth";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = props.dispatch;
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
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(setMessage({ passwordConfirm: "비밀번호가 다릅니다." }));
      return;
    }
    dispatch(register(username, email, password))
      .then(() => {
        alert(props.message);
        history.push("/");
      })
      .catch(() => {
        console.log(props.message);
        console.log(Object.values(props.message)[0]);
      });
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
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            onChange={handleUsernameChange}
            placeholder="ID"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="password"
          />
          <label htmlFor="password-confirm">Password Confirm</label>
          <input
            type="password"
            id="password-confirm"
            onChange={handlePasswordConfirmChange}
            placeholder="password confirm"
          />
          <input type="submit" />
        </Form>
        {props.message ? (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              <ul>
                {Object.values(props.message)[0].map((msg, idx) => {
                  return <li key={idx}>{msg}</li>;
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { message } = state.messageReducer;
  return { message };
}

export default connect(mapStateToProps)(Register);
