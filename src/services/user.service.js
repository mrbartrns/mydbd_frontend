import api from "./api";
import axios from "axios";
// get data and get | post comments
// api service는 dispatch로 관리 할 필요 없음
// TODO: 추후 여러 querystring을 관리하기 위하여 url 자체를 입력받도록 변경
// TODO: create unsubscribe method

class UserService {
  getApiList(pathname, params) {
    return api.get("api" + pathname, { params });
  }

  getCommentList(pathname, params) {
    return api.get("service/list" + pathname + "/comments", { params });
  }

  getApiDetail(pathname) {
    return api.get("api" + pathname + "/detail");
  }

  // unsubscribe
  getCancelToken() {
    return axios.CancelToken.source();
  }

  unsubscribe() {
    return axios.CancelToken.source().cancel();
  }

  isCancel(error) {
    return axios.isCancel(error);
  }

  getTestApiList() {
    return axios.get("https://jsonplaceholder.typicode.com/comments");
  }
}

export default new UserService();
