import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

// custom imports
import HomePage from "./components/pages/HomePage";
import Error from "./components/error.component";
// import AuthVerify from "./common/auth-verify";
import ListTemplate from "./templates/list.template";
import DetailTemplate from "./templates/detail.template";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ForumRoute from "./routes/forum.routes";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegisterPage} />
        <Route path="/forum" component={ForumRoute} />
        <Route path="/:category/list" component={ListTemplate} />
        <Route path="/:category/:id" component={DetailTemplate} />
        <Route path="/my404" component={Error} />
        <Route component={Error} />
      </Switch>
      {/* <AuthVerify logout={handleLogout} /> */}
    </div>
  );
}

function makeStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(makeStateToProps)(App);
