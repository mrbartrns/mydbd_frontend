import "./css/App.css";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "./actions/auth";
import AuthVerify from "./common/auth-verify";

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

  return (
    <div className="App">
      {props.isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : null}
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exat path="/signup" component={Register} />
        </Switch>
      </Container>
      <AuthVerify logout={handleLogout} />
    </div>
  );
}

function makeStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(makeStateToProps)(App);
