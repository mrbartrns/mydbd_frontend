import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import NavbarWrapper from "./components/nav.component";
import Login from "./components/login.component";
import ValidationComponent from "./components/validationpage.component";
import Register from "./components/register.component";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      {/* <NavbarWrapper></NavbarWrapper> */}
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup">
            <Register />
          </Route>
          <Route exact path="/validate">
            <ValidationComponent></ValidationComponent>
          </Route> */}
        </Switch>
      </Container>
    </div>
  );
}

export default App;
