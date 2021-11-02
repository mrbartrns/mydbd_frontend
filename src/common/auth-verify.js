import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { isValidToken } from "../functions";
import TokenService from "../services/token.service";

// TODO: separate options when check automatically login
function AuthVerify(props) {
  const history = useHistory();
  history.listen(() => {
    const refreshToken = TokenService.getLocalRefreshToken();

    if (!isValidToken(refreshToken)) {
      props.logout();
    }
  });
  return <div />;
}

// location, history, match 를 Router 외부에서 쓰게 하기 위해서는 withRouter함수가 필요하다.
export default withRouter(AuthVerify);
