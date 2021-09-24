import api from "./api";
import axios from "axios";
// get data and get | post comments
// api service는 dispatch로 관리 할 필요 없음
// TODO: 추후 여러 querystring을 관리하기 위하여 url 자체를 입력받도록 변경

class UserService {
  getApiList(pathName, params) {
    return api.get("api/list/" + pathName, { params });
  }

  // ex) detail/killer/1
  getApiDetail(pathname) {
    return api.get("api" + pathname);
  }

  getTestApiList() {
    return axios.get("https://jsonplaceholder.typicode.com/comments");
  }
}

export default new UserService();
