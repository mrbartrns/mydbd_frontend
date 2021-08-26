// refresh token을 이용하여 자동으로 access token 갱신

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
