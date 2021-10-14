// react imports
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// custom imports
import { login } from "../actions/auth";
import LoginComponent from "../components/Login";

// functions

function LoginTemplate(props) {
  // constants
  const dispatch = useDispatch();
  const history = useHistory();

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // functions
  function handleUsernameChange(e) {
    // form function -> change by event
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    if (props.isLoggedIn) {
      history.go(0);
    }
    dispatch(login(username, password)).then((response) => {
      history.goBack();
    });
  }

  return (
    <LoginComponent
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleLoginSubmit={handleLoginSubmit}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  const { message } = state.messageReducer;
  return { isLoggedIn, user, message };
}

export default connect(mapStateToProps)(LoginTemplate);
