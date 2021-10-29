import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";

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
          // originalConfig._retry = true;
          // FIXME: Fix Infinity loop after access token is expired
          // when access token expires, client post refresh token if there is
          // get refreshed access token, save to redux store and localstorage
          try {
            const response = await axiosInstance.post("user/token/refresh", {
              refresh: TokenService.getLocalRefreshToken(),
            });
            const accessToken = response.data.access;

            // Change redux state access
            dispatch(refreshToken(accessToken));

            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            TokenService.removeUser();
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
