import { set } from "immutable";
import api from "./api";
import axios from "axios";
// get data and get | post comments
// api service는 dispatch로 관리 할 필요 없음

class UserService {
  getApiList(pathName, pageNumber = 1) {
    return api.get("api/list/" + pathName + "?page=" + String(pageNumber));
  }
  getTestApiList() {
    return axios.get("https://jsonplaceholder.typicode.com/comments");
  }
}

export default new UserService();
