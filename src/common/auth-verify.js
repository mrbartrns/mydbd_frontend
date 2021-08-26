import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const parseJwt = (token) => {
  try {
    const jwt = jwt_decode(token);
    return jwt;
  } catch (e) {
    return null;
  }
};

function AuthVerify(props) {
  const history = useHistory();
  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("verifying token");

    if (user) {
      const decodedJwt = parseJwt(user.access);
      if (decodedJwt["exp"] * 1000 < new Date().getTime()) {
        props.logout();
      }
    }
  });
  return <div />;
}

export default withRouter(AuthVerify);
