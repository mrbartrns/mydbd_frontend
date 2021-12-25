import tokenService from "../services/token.service";
import axiosInstance from "../services/api";

let authTokenRequest;

function makeActualAuthenticationRequest() {
  const rs = tokenService.getLocalRefreshToken();
  return axiosInstance.post("user/token/refresh", { refresh: rs });
}

// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
export default function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = makeActualAuthenticationRequest();
    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}
