import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LoginModal from "../../components/organisms/LoginModal/LoginModal";
import { login } from "../../actions/auth";

function LoginContainer({ isLoggedIn, dispatch }) {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: null,
  });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoggedIn) {
        window.alert("이미 로그인하셨습니다.");
        history.goBack();
        return;
      }
      try {
        await dispatch(login(userData.username, userData.password));
        history.goBack();
      } catch (error) {
        const ERROR_MESSAGE = "아이디 또는 비밀번호를 다시 한번 확인하세요.";
        if (error.response && error.response.status === 401) {
          setUserData((prev) => {
            return {
              ...prev,
              error: ERROR_MESSAGE,
            };
          });
        }
      }
    },
    [history, isLoggedIn, userData, dispatch]
  );

  const onChangeUsername = useCallback((e) => {
    setUserData((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  }, []);

  const onChangePassword = useCallback((e) => {
    setUserData((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  }, []);

  if (isLoggedIn) {
    window.alert("이미 로그인하셨습니다.");
    return <Redirect to="/" />;
  }

  return (
    <LoginModal
      username={userData.username}
      password={userData.password}
      error={userData.error}
      onSubmit={onSubmit}
      onChangeUsername={onChangeUsername}
      onChangePassword={onChangePassword}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(LoginContainer);
