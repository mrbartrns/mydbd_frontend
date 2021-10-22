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

    if (user) {
      const decodedJwt = parseJwt(user.access);
      if (decodedJwt["exp"] * 1000 < new Date().getTime()) {
        props.logout();
      }
    }
  });
  return <div />;
}

// location, history, match 를 Router 외부에서 쓰게 하기 위해서는 withRouter함수가 필요하다.
export default withRouter(AuthVerify);
