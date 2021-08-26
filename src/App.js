import "./css/App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./components/login.component";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout, refreshTokenTest } from "./actions/auth";

function App(props) {
  const history = useHistory();
  const dispatch = props.dispatch;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
      .then((response) => {
        console.log(response);
        history.go(0);
      })
      .then((err) => {
        console.log(err);
      });
  };

  // const handleRefreshToken = (e) => {
  //   e.preventDefault();
  //   const refresh = JSON.parse(localStorage.getItem("user")).refresh || null;
  //   dispatch(refreshTokenTest(refresh));
  // };

  return (
    <div className="App">
      {props.isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : null}
      {/* {props.isLoggedIn ? (
        <Button onClick={handleRefreshToken}>RefreshToken</Button>
      ) : null} */}
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </div>
  );
}

function makeStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(makeStateToProps)(App);
