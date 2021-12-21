import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import RegisterModal from "../../components/organisms/RegisterModal/RegisterModal";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

function RegisterContainer({ isLoggedIn, dispatch }) {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (userData.password !== userData.passwordConfirm) {
        setError("비밀번호와 비밀번호 확인칸이 서로 다릅니다.");
        return;
      }
      try {
        await dispatch(
          register(userData.username, userData.email, userData.password)
        );
        window.alert("회원가입이 완료되었습니다.");
        history.push("/");
      } catch (error) {
        setError("임시 에러 메시지");
      }
    },
    [userData, history, dispatch]
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

  const onChangePasswordConfirm = useCallback((e) => {
    setUserData((prev) => {
      return {
        ...prev,
        passwordConfirm: e.target.value,
      };
    });
  }, []);

  const onChangeEmail = useCallback((e) => {
    setUserData((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  }, []);

  return (
    <RegisterModal
      username={userData.username}
      password={userData.password}
      passwordConfirm={userData.passwordConfirm}
      email={userData.email}
      onChangeUsername={onChangeUsername}
      onChangePassword={onChangePassword}
      onChangePasswordConfirm={onChangePasswordConfirm}
      onChangeEmail={onChangeEmail}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(RegisterContainer);
