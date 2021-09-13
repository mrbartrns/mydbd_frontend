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
import List from "./components/list.component";
import Test from "./components/test.component";
import ListState from "./components/list.prop.component";

function App(props) {
  const history = useHistory();
  const dispatch = props.dispatch;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then((response) => {
      console.log(response);
      history.go(0);
    });
  };
  return (
    <div className="App">
      {props.isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : null}
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route path="/list/:category" component={List} />
          <Route exact path="/test" component={ListState} />
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
