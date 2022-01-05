import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ dispatch, isLoggedIn, children, ...rest }) {
  return (
    <Route {...rest}>{!isLoggedIn ? <Redirect to="/login" /> : children}</Route>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(PrivateRoute);
