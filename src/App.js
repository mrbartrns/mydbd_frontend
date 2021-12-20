import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "./actions/auth";

// custom imports
import Home from "./components/home.component";
import Error from "./components/error.component";
import Navbar from "./components/Navbar/index";
// import AuthVerify from "./common/auth-verify";
import ListTemplate from "./templates/list.template";
import DetailTemplate from "./templates/detail.template";
import LoginTemplate from "./templates/login.template";
import RegisterTemplate from "./templates/register.template";
import Forum from "./routes/forum.routes";
import InlineErrorMessage from "./components/inline_error.component";
import LoginModal from "./components/organisms/LoginModal/LoginModal";
import TestPageTemplate from "./components/templates/TestPageTemplate";
function App(props) {
  // constants
  const history = useHistory();
  const dispatch = props.dispatch;

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      history.go(0);
    } catch (error) {
      // do nothing
      console.error(error);
    }
  };

  // return router and navbar component
  // TODO: Separate All routes
  return (
    <div className="App">
      <Navbar logout={handleLogout} />
      <InlineErrorMessage />
      <Container md="true">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginModal} />
          <Route exact path="/signup" component={RegisterTemplate} />
          <Route path="/forum" component={Forum} />
          <Route path="/:category/list" component={ListTemplate} />
          <Route path="/:category/:id" component={DetailTemplate} />
          <Route path="/my404" component={Error} />
          <Route path="/test" component={TestPageTemplate} />
          <Route component={Error} />
        </Switch>
      </Container>
      {/* <AuthVerify logout={handleLogout} /> */}
    </div>
  );
}

function makeStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(makeStateToProps)(App);
