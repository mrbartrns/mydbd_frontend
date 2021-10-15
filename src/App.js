import "./css/Component.scss";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

// custom imports
import Home from "./components/home.component";
// import Login from "./components/login.component";
import Register from "./components/register.component";
import Error from "./components/error.component";
import Navbar from "./components/Navbar/index";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "./actions/auth";
import AuthVerify from "./common/auth-verify";
import ListTemplate from "./templates/list.template";
import DetailTemplate from "./templates/detail.template";
import LoginTemplate from "./templates/login.template";

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
      <Navbar logout={handleLogout} />
      <Container md="true">
        <Switch>
          <Route exact path="/" component={Home} />/
          <Route exact path="/login" component={LoginTemplate} />
          <Route exact path="/signup" component={Register} />
          <Route path="/:category/list" component={ListTemplate} />
          <Route path="/:category/:id" component={DetailTemplate} />
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
