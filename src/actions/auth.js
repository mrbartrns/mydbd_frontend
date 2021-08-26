import AuthService from "../services/auth.service";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_MESSAGE,
  REFRESH_TOKEN,
} from "./types";
import TokenService from "../services/token.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "Successfully registered.",
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      dispatch({
        type: REGISTER_FAIL,
      });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.data },
      });
      return Promise.resolve(response);
    },
    (error) => {
      const message = error.response.data.detail;
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  return AuthService.logout().finally(() => {
    TokenService.removeUser();
    dispatch({ type: LOGOUT });
  });
};

export const refreshToken = (refresh) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: refresh,
  });
};

export const refreshTokenTest = (refresh) => (dispatch) => {
  return AuthService.refreshTest(refresh).then(
    () => {
      dispatch({
        type: REFRESH_TOKEN,
        payload: refresh,
      });
    },
    (error) => {
      console.log(error);
    }
  );
};
