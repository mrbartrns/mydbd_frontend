import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isValidToken } from "../functions";
import TokenService from "../services/token.service";
import { logout } from "../actions/auth";

// TODO: separate options when check automatically login
function AuthVerify() {
  // if accessToken is Expired, automatically logout
  // axios interceptor automatically refresh access token
  const dispatch = useDispatch();
  const history = useHistory();
  history.listen(() => {
    console.log("here");
    const refreshToken = TokenService.getLocalRefreshToken();
    if (!isValidToken(refreshToken)) {
      window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
      dispatch(logout());
    }
  });
  return <div />;
}

// location, history, match 를 Router 외부에서 쓰게 하기 위해서는 withRouter함수가 필요하다.
export default withRouter(AuthVerify);
