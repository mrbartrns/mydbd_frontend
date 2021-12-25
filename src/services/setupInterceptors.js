import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";

import { isValidToken } from "../functions";
import { LOGOUT } from "../actions/types";

let refreshTokenPromise;

/**
 * request, response를 받을때 error를 정의하는 interceptor
 */
const setup = (store) => {
  const { dispatch } = store;
  const getAccessToken = async () => {
    const rs = TokenService.getLocalRefreshToken();
    const response = await axiosInstance.post("user/token/refresh", {
      refresh: rs,
    });
    const accessToken = response.data.access;
    dispatch(refreshToken(accessToken));
    TokenService.updateLocalAccessToken(accessToken);
    return accessToken;
  };
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

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/user/login" && err.response) {
        if (err.response && err.response.status === 401) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = getAccessToken().then((token) => {
              refreshTokenPromise = null;
              return token;
            });
          }
        }
        return refreshTokenPromise.then((token) => {
          originalConfig.headers["Authorization"] = "Bearer " + token;
          return axiosInstance(originalConfig);
        });
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
