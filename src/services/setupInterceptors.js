import axiosInstance from "./api";
import tokenService from "./token.service";
import { refreshToken, logout } from "../actions/auth";

/**
 * request, response를 받을때 error를 정의하는 interceptor
 */
const setup = (store) => {
  const { dispatch } = store;
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      const originalConfig = res.config;
      if (originalConfig.url === "user/token/refresh") {
      }
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        err.response &&
        err.response.status === 401 &&
        originalConfig.url === "user/token/refresh"
      ) {
        return Promise.reject(err);
      }
      if (originalConfig.url !== "/user/login" && err.response) {
        if (
          err.response &&
          err.response.status === 401 &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;
          const localRefreshToken = tokenService.getLocalRefreshToken();
          return axiosInstance
            .post("user/token/refresh", { refresh: localRefreshToken })
            .then((response) => {
              const access = response.data.access;
              // 1) put token to LocalStorage and refresh redux store
              tokenService.updateLocalAccessToken(access);
              dispatch(refreshToken(access));
              // 2) change Authorization header
              originalConfig.headers.Authorization = `Bearer ${access}`;
              // 3) return the origianl request object with axios
              return axiosInstance(originalConfig);
            })
            .catch((error) => {
              dispatch(logout());
              return Promise.reject(error);
            });
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
