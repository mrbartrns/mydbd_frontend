import axios from "axios";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  APPLICATION_JSON,
  BASE_API_URL,
  BEARER,
} from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: BEARER + localStorage.getItem(ACCESS_TOKEN),
    "Content-Type": APPLICATION_JSON,
    accept: APPLICATION_JSON,
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = localStorage.getItem(REFRESH_TOKEN);

      return axiosInstance
        .post("user/token/refresh", { refresh: refresh_token })
        .then((res) => res.data)
        .then((data) => {
          localStorage.setItem(ACCESS_TOKEN, data.access);
          localStorage.setItem(REFRESH_TOKEN, data.refresh);

          axiosInstance.defaults.headers["Authorization"] =
            BEARER + data.access;
          originalRequest.headers["Authorization"] = BEARER + data.access;
          return axiosInstance(originalRequest);
        })
        .catcn((err) => {
          console.error(err);
        });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
