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
import ForumListTemplate from "./templates/forum_list.template";
import ForumDetailTemplate from "./templates/forum_detail.template";
import ForumPostTemplate from "./templates/forum_post.template";
import ForumEditTemplate from "./templates/forum_edit.template";

function App(props) {
  // constants
  const history = useHistory();
  const dispatch = props.dispatch;

  // handle logout function
  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      history.go(0);
    });
  };

  // return router and navbar component
  // TODO: Separate All routes
  return (
    <div className="App">
      <Navbar logout={handleLogout} />
      <Container md="true">
        <Switch>
          <Route exact path="/" component={Home} />/
          <Route exact path="/login" component={LoginTemplate} />
          <Route exact path="/signup" component={RegisterTemplate} />
          <Route exact path="/forum" component={ForumListTemplate} />
          <Route exact path="/forum/write" component={ForumPostTemplate} />
          <Route
            exact
            path="/forum/article/:id"
            component={ForumDetailTemplate}
          />
          <Route
            exact
            path="/forum/article/:id/edit"
            component={ForumEditTemplate}
          />
          <Route path="/:category/list" component={ListTemplate} />
          <Route path="/:category/:id" component={DetailTemplate} />
          <Route path="/my404" component={Error} />
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
