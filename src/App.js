import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import NavbarWrapper from "./components/nav.component";
import LoginModal from "./components/login.component";
import ValidationComponent from "./components/validationpage.component";
import Register from "./components/register.component";
import axiosInstance from "./axiosApi";
import {
  ACCESS_TOKEN,
  AUTHORIZATION,
  REFRESH_TOKEN,
  USERNAME,
  BEARER,
} from "./constants";
import { Container } from "react-bootstrap";

function App() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const login = async (userData) => {
    axiosInstance
      .post("user/login", userData)
      .then((json) => json.data)
      .then((data) => {
        axiosInstance.defaults.headers[AUTHORIZATION] = BEARER + data.access;
        console.log(axiosInstance.defaults.headers);
        localStorage.setItem(ACCESS_TOKEN, data.access);
        localStorage.setItem(REFRESH_TOKEN, data.refresh);
        localStorage.setItem(USERNAME, data.user.username);
        setUser(data.user.username);
        history.push("/");
        return data;
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  };
  const logout = async () => {
    try {
      const response = await axiosInstance.post("user/logout", {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      });
      console.log(response.data);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(USERNAME);
      axiosInstance.defaults.headers[AUTHORIZATION] = null;
      console.log(axiosInstance.defaults.headers);
      setUser("");
      history.push("/");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem(USERNAME);
    // if logged in
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  return (
    <div className="App">
      <NavbarWrapper user={user} logout={logout}></NavbarWrapper>
      <Container>
        <Switch>
          <Route exact path="/login">
            <LoginModal login={login} error={error} />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route exact path="/validate">
            <ValidationComponent></ValidationComponent>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
