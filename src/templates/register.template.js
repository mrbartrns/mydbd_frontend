// react imports
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// custom imports
import { setMessage } from "../actions/message";
import { register } from "../actions/auth";

// components
import RegisterComponent from "../components/Register/register.component";

function RegisterTemplate(props) {
  // constants
  const history = useHistory();
  const dispatch = useDispatch();

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  // functions
  // these functions are callback functions of dom event
  function handleUsernameChange(e) {
    // change username state
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    // change password state
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    // change passwordConfirm State
    setPasswordConfirm(e.target.value);
  }
  function handleEmailChange(e) {
    // change email state
    setEmail(e.target.value);
  }
  function handleRegisterSubmit(e) {
    // POST to register api
    e.preventDefault();
    if (password !== passwordConfirm) {
      // password and passwordConfirm equivalence validation
      dispatch(
        setMessage({
          passwordConfirm: "비밀번호와 비밀번호확인이 서로 다릅니다!",
        })
      );
      return;
    }
    dispatch(register({ username, email, password }))
      .then((response) => {
        // TODO: remove alert and set message on home
        alert(props.message);
        history.push("/");
      })
      .catch((error) => {
        console.log(props.message);
      });
  }
  return (
    <RegisterComponent
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handlePasswordConfirmChange={handlePasswordConfirmChange}
      handleEmailChange={handleEmailChange}
      submit={handleRegisterSubmit}
    />
  );
}

function mapStateToProps(state) {
  const { message } = state.messageReducer;
  return { message };
}

export default connect(mapStateToProps)(RegisterTemplate);
