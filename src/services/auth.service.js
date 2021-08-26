import axios from "axios";
import TokenService from "./token.service";
import api from "./api";

const API_URL = "http://localhost:8000/api";

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
        console.log(response);
        if (response.data) {
          TokenService.updateLocalAccessToken(response.data);
        }
        return response;
      });
  }
}

export default new AuthService();
