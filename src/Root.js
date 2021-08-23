import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";

// redux store를 받는 함수
const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
