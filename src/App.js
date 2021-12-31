import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./components/pages/HomePage";
import Error from "./components/error.component";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ForumRoute from "./Routes/forum.routes";
import GameListPage from "./components/pages/GameListPage";
import GameDetailPage from "./components/pages/GameDetailPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegisterPage} />
        <Route path="/forum" component={ForumRoute} />
        <Route path="/:category/list" component={GameListPage} />
        <Route path="/:category/:id" component={GameDetailPage} />
        <Route path="/my404" component={Error} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

function makeStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(makeStateToProps)(App);
