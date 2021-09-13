import "./css/App.css";
import "./css/Component.scss";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Error from "./components/error.component";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "./actions/auth";
import AuthVerify from "./common/auth-verify";
import ListTemplate from "./components/list.template.component";

function App(props) {
  // constants
  const history = useHistory();
  const dispatch = props.dispatch;

  // handle logout function
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then((response) => {
      history.go(0);
    });
  };

  // return router and navbar component
  return (
    <div className="App">
      {props.isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : null}
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route path="/list/:category" component={ListTemplate} />
          <Route path="/my404" component={Error} />
          <Route component={Error} />
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
