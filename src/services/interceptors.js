import axiosInstance from "./api";
import tokenService from "./token.service";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { logout } from "../actions/auth";

export default function setup(store) {
  const { dispatch } = store;
  axiosInstance.interceptors.request.use(async (req) => {
    const accessToken = tokenService.getLocalAccessToken();
    console.log("here");
    if (accessToken) {
      const user = jwt_decode(accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      console.log("isExpired:", isExpired);
      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      }
      console.log("access token is expired");
      const localRefreshToken = tokenService.getLocalRefreshToken();
      if (localRefreshToken) {
        // if local refresh token exsists, try to refresh local access token
        try {
          const response = await axiosInstance.post(`user/token/refresh/`, {
            refresh: localRefreshToken,
          });
          tokenService.updateLocalAccessToken(response.data.access);
          req.headers.Authorization = `Bearer ${response.data.access}`;
        } catch (error) {
          dispatch(logout());
          console.log("done");
          delete req.headers.Authorization;
        }
        return req;
      }
      dispatch(logout());
      return req;
    }

    return req;
  });
}
