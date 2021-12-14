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

  getForumList(params) {
    return api.get("service/forum/list", { params });
  }

  getForumArticle(pathname) {
    return api.get("service" + pathname);
  }

  postForumArticle(data) {
    return api.post("service/forum/article/create", data);
  }

  updateForumArticle(pathname, data) {
    return api.put("service" + pathname, data);
  }

  postComment(pathname, data) {
    return api.post("service/list" + pathname + "/comments/create", data);
  }

  getArticleCommentList(pathname, params) {
    return api.get("service" + pathname + "/comment/list", { params });
  }

  postArticleComment(pathname, data) {
    return api.post("service" + pathname + "/comment/create", data);
  }

  updateComment(commentId, data) {
    return api.put("service/comment/" + String(commentId), data);
  }

  deleteComment(commentId) {
    return api.post("service/comment/" + String(commentId) + "/delete");
  }

  getApiDetail(pathname) {
    return api.get("api" + pathname + "/detail");
  }

  // likeInfo = {like: false, dislike: false}
  toggleArticleLike(pathname, likeInfo) {
    return api.post("service" + pathname + "/like", likeInfo);
  }

  toggleCommentLike(commentId, likeInfo) {
    return api.post("service/comment/" + String(commentId) + "/like", likeInfo);
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

  test(data) {
    return api.post("service/test", data);
  }
}

export default new UserService();
