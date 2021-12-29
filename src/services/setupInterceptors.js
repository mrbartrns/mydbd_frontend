import axiosInstance from "./api";
import tokenService from "./token.service";
import { refreshToken, logout } from "../actions/auth";
import { isValidToken } from "../functions";

let refreshTokenPromise;

/**
 * request, response를 받을때 error를 정의하는 interceptor
 */
const setup = (store) => {
  const { dispatch } = store;
  const getAccessToken = async () => {
    try {
      const rs = tokenService.getLocalRefreshToken();
      const response = await axiosInstance.post("user/token/refresh", {
        refresh: rs,
      });
      const accessToken = response.data.access;
      dispatch(refreshToken(accessToken));
      tokenService.updateLocalAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
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
        if (
          err.response &&
          err.response.status === 401 &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          // modified code
          const rs = tokenService.getLocalRefreshToken();
          if (!isValidToken(rs)) {
            dispatch(logout());
            originalConfig.headers["Authorization"] = null;
            return axiosInstance(originalConfig);
          }
          if (rs && !refreshTokenPromise) {
            refreshTokenPromise = getAccessToken().then((token) => {
              refreshTokenPromise = null;
              return token;
            });
          }
        }
        return refreshTokenPromise
          .then((token) => {
            originalConfig.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalConfig);
          })
          .catch((error) => {
            originalConfig.headers["Authorization"] = null;
          });
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
