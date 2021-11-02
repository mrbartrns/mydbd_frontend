import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";

import { isValidToken } from "../functions";
import { LOGOUT } from "../actions/types";

/**
 * request, response를 받을때 error를 정의하는 interceptor
 */
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/user/login" && err.response) {
        // Access token was expired
        // TODO: modify logic when refresh token === null

        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          // FIXME: Fix Infinity loop after access token is expired
          // when access token expires, client post refresh token if there is
          // get refreshed access token, save to redux store and localstorage
          const rs = TokenService.getLocalRefreshToken();
          if (!isValidToken(rs)) {
            window.alert(
              "토큰이 만료되어 로그아웃되었습니다. 다시 로그인 해주세요."
            );
            TokenService.removeUser();
            dispatch({ type: LOGOUT });
            return axiosInstance(originalConfig);
          }
          try {
            const response = await axiosInstance.post("user/token/refresh", {
              refresh: rs,
            });
            const accessToken = response.data.access;

            console.log("토큰 재발행");
            // Change redux state access
            dispatch(refreshToken(accessToken));

            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
