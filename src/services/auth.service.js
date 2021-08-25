import axios from "axios";

const API_URL = "http://localhost:8000/api";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/user/login", { username, password })
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      });
  }

  logout() {
    return axios.post(API_URL + "/user/logout", {
      refresh: JSON.parse(localStorage.getItem("user")).refresh,
    });
  }

  register(username, email, password) {
    return axios.post(API_URL + "/user/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
