import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";

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

      if (!TokenService.getLocalRefreshToken()) {
        return;
      }

      if (originalConfig.url !== "user/login" && err.response) {
        // Access token was expired
        // TODO: modify logic when refresh token === null
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("user/token/refresh", {
              refresh: TokenService.getLocalRefreshToken(),
            });
            const accessToken = rs.data.access;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            // TODO: NEED TO TEST
            TokenService.removeUser();
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;
