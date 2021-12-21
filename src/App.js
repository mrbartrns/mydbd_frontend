import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./actions/auth";

// custom imports
import HomePage from "./components/pages/HomePage";
import Error from "./components/error.component";
// import AuthVerify from "./common/auth-verify";
import ListTemplate from "./templates/list.template";
import DetailTemplate from "./templates/detail.template";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ForumRoute from "./routes/forum.routes";
import InlineErrorMessage from "./components/inline_error.component";

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
      {/* <Navbar logout={handleLogout} /> */}
      <InlineErrorMessage />
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
