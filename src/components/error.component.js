import React from "react";
import { useHistory } from "react-router-dom";

function ErrorPage({ message }) {
  const history = useHistory();
  return (
    <div className="error">
      <h1>{message ? message : "HTTP404ERROR"}</h1>
      <span onClick={history.goBack}>뒤로가기</span>
    </div>
  );
}

export default ErrorPage;
