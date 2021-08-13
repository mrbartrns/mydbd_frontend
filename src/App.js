import "./App.css";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import NavbarWrapper from "./components/Nav";
import LoginModal from "./components/LoginModal";
import ValidationComponent from "./components/ValidationPage";
import Register from "./components/Register";
import axiosInstance from "./axiosApi";
import { ACCESS_TOKEN, AUTHORIZATION, REFRESH_TOKEN } from "./constants";
// import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [modal, setModal] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout", {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      });
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      axiosInstance.defaults.headers[AUTHORIZATION] = null;
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  // const userHasAuthenticated = (authenticated, username, token) => {
  //   setisAuthenticated(authenticated);
  //   setUser(username);
  //   localStorage.setItem("token", token);
  // };
  return (
    <div className="App">
      <NavbarWrapper></NavbarWrapper>
      <Switch>
        <Route exact path="/login">
          <LoginModal
            setModal={setModal}
            // userHasAuthenticated={userHasAuthenticated}
          />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/validate">
          <ValidationComponent></ValidationComponent>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
