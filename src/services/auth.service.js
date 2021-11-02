import TokenService from "./token.service";
import api from "./api";

import { isValidToken } from "../functions";
class AuthService {
  login(username, password) {
    return api.post("/user/login", { username, password }).then((response) => {
      if (response.data.access) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }
      return response;
    });
  }

  logout() {
    const token = TokenService.getLocalRefreshToken();
    if (!isValidToken(token)) {
      return Promise.resolve();
    }
    return api.post("/user/logout", {
      refresh: TokenService.getLocalRefreshToken(),
    });
  }

  register(username, email, password) {
    return api.post("/user/signup", {
      username,
      email,
      password,
    });
  }

  refreshTest(refresh) {
    return api
      .post("/user/token/refresh", {
        refresh,
      })
      .then((response) => {
        if (response.data) {
          TokenService.updateLocalAccessToken(response.data);
        }
        return response;
      });
  }
}

export default new AuthService();
