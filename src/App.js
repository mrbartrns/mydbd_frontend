import "./App.css";
import React, { useState } from "react";
import NavbarWrapper from "./components/Nav";
import LoginModal from "./components/LoginModal";
import { Route, Switch } from "react-router-dom";
import ValidationComponent from "./components/ValidationPage";
import Register from "./components/Register";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [modal, setModal] = useState(false);
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
